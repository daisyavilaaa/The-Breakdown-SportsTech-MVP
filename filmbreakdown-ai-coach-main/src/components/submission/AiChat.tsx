import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, User, Send } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { streamChat } from "@/lib/streamChat";
import type { IntakeData } from "./IntakeForm";
import { toast } from "sonner";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface AiChatProps {
  intakeData: IntakeData;
  onComplete: (messages: ChatMessage[], summary: any) => void;
}

export function AiChat({ intakeData, onComplete }: AiChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [started, setStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (!started) {
      setStarted(true);
      sendToAI([], true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendToAI = async (conversationMessages: ChatMessage[], isInitial: boolean) => {
    setIsStreaming(true);
    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: conversationMessages,
        intakeData: isInitial ? intakeData : undefined,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => {
          setIsStreaming(false);
          if (assistantSoFar.includes("SUMMARY_READY:")) {
            try {
              const jsonStr = assistantSoFar.split("SUMMARY_READY:")[1].trim();
              const summary = JSON.parse(jsonStr);
              const finalMessages = [
                ...conversationMessages,
                { role: "assistant" as const, content: assistantSoFar },
              ];
              setTimeout(() => onComplete(finalMessages, summary), 1500);
            } catch (e) {
              console.error("Failed to parse summary:", e);
            }
          }
        },
      });
    } catch (e) {
      setIsStreaming(false);
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  const handleSend = () => {
    if (!userInput.trim() || isStreaming) return;
    const newMsg: ChatMessage = { role: "user", content: userInput };
    const newMessages = [...messages, newMsg];
    setMessages(newMessages);
    setUserInput("");
    sendToAI(newMessages, false);
  };

  return (
    <motion.div
      key="ai-chat"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Submission Assistant</h2>
          <p className="text-xs text-muted-foreground">Helping you explain what you need feedback on</p>
        </div>
      </div>

      <div className="border-t border-border my-4" />

      <div className="space-y-5 mb-6 min-h-[300px] max-h-[450px] overflow-y-auto pr-2">
        {messages.map((msg, i) => {
          const displayContent = msg.content.includes("SUMMARY_READY:")
            ? "Thanks for sharing all of that! I've put together a clear summary for the pro athlete. Let me show you what I've got…"
            : msg.content;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>
              )}
              <div
                className={`text-sm leading-relaxed max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-secondary border border-border rounded-2xl rounded-br-md px-4 py-3 text-foreground"
                    : "text-foreground/90"
                }`}
              >
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  }}
                >
                  {displayContent}
                </ReactMarkdown>
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-md bg-secondary border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          );
        })}

        {isStreaming && messages.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-3 border-t border-border pt-4">
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Tell me what's on your mind..."
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          disabled={isStreaming}
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          disabled={!userInput.trim() || isStreaming}
          size="icon"
          className="h-10 w-10 flex-shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
