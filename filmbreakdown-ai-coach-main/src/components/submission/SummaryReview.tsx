import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Pencil, Check } from "lucide-react";
import { motion } from "framer-motion";
import type { IntakeData } from "./IntakeForm";

export interface SubmissionSummary {
  headline: string;
  athleteDescription: string;
  technicalInterpretation: string;
  requestedFeedback: string;
  rootCategory: string;
}

interface SummaryReviewProps {
  intakeData: IntakeData;
  summary: SubmissionSummary;
  onSubmit: (editedSummary: SubmissionSummary) => void;
}

export function SummaryReview({ intakeData, summary, onSubmit }: SummaryReviewProps) {
  const [edited, setEdited] = useState<SubmissionSummary>(summary);
  const [editingField, setEditingField] = useState<string | null>(null);

  return (
    <motion.div
      key="summary"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-foreground tracking-tight">Review Your Submission</h2>
      <p className="text-sm text-muted-foreground mt-2 mb-8">
        We translated your conversation into a clear summary for the pro athlete. Edit anything before submitting.
      </p>

      <div className="space-y-0 p-6 rounded-lg border border-border bg-card">
        <div className="pb-5">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Submission Headline</p>
          <p className="text-base font-medium text-foreground leading-relaxed">{edited.headline}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Sport</p>
            <p className="text-sm font-medium text-foreground">{intakeData.sport}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Position</p>
            <p className="text-sm font-medium text-foreground">{intakeData.position}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Age</p>
            <p className="text-sm font-medium text-foreground">{intakeData.age}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Video Type</p>
            <p className="text-sm font-medium text-foreground">{intakeData.videoType}</p>
          </div>
        </div>

        <EditableField
          label="Athlete Description"
          sublabel="What you told us in your own words"
          value={edited.athleteDescription}
          isEditing={editingField === "athleteDescription"}
          onEdit={() => setEditingField("athleteDescription")}
          onSave={(val) => { setEdited({ ...edited, athleteDescription: val }); setEditingField(null); }}
        />

        <EditableField
          label="Technical Interpretation"
          sublabel="How the pro athlete will understand your issue"
          value={edited.technicalInterpretation}
          isEditing={editingField === "technicalInterpretation"}
          onEdit={() => setEditingField("technicalInterpretation")}
          onSave={(val) => { setEdited({ ...edited, technicalInterpretation: val }); setEditingField(null); }}
        />

        <EditableField
          label="Requested Feedback"
          sublabel="What you want the pro to analyze"
          value={edited.requestedFeedback}
          isEditing={editingField === "requestedFeedback"}
          onEdit={() => setEditingField("requestedFeedback")}
          onSave={(val) => { setEdited({ ...edited, requestedFeedback: val }); setEditingField(null); }}
        />

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Root Category</p>
          <span className="inline-block text-xs px-3 py-1 rounded-md bg-primary/10 text-primary font-medium">
            {edited.rootCategory}
          </span>
        </div>
      </div>

      <Button onClick={() => onSubmit(edited)} className="w-full mt-6 gap-2 h-11 text-sm font-medium">
        Submit for Review
        <ArrowRight className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}

function EditableField({
  label,
  sublabel,
  value,
  isEditing,
  onEdit,
  onSave,
}: {
  label: string;
  sublabel: string;
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (val: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  useEffect(() => { setDraft(value); }, [value, isEditing]);

  return (
    <div className="pt-4 border-t border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">{label}</p>
          <p className="text-[11px] text-muted-foreground/70 mb-2">{sublabel}</p>
          {isEditing ? (
            <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} className="text-sm" autoFocus />
          ) : (
            <p className="text-sm text-foreground leading-relaxed">{value || "—"}</p>
          )}
        </div>
        <div className="flex-shrink-0 mt-5">
          {isEditing ? (
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onSave(draft)}>
              <Check className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={onEdit}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
