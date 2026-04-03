import { motion } from "framer-motion";
import { Check, User, Star, Award, Film, MessageSquare, Quote, ClipboardList, Camera } from "lucide-react";

interface ProfilePreviewProps {
  data: {
    fullName: string;
    positionLabel: string;
    publicTitle: string;
    valueStatement: string;
    highestLevel: string;
    experienceTypes: string[];
    achievements: string[];
    customAchievements: string[];
    expertise: string[];
    customExpertise: string[];
    clipTypes: string[];
    customClipTypes: string[];
    exampleQuestions: string[];
    customQuestions: string[];
    submissionPreferences: string[];
    customSubmissionPreferences: string[];
    profileImageUrl: string | null;
  };
}

export function ProfilePreview({ data }: ProfilePreviewProps) {
  const allAchievements = [...data.achievements, ...data.customAchievements];
  const allExpertise = [...data.expertise, ...data.customExpertise];
  const allClipTypes = [...data.clipTypes, ...data.customClipTypes];
  const allQuestions = [...data.exampleQuestions, ...data.customQuestions];
  const allPrefs = [
    ...data.submissionPreferences,
    ...data.customSubmissionPreferences,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-card p-6 space-y-5"
    >
      <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium mb-4">
        Live Preview
      </div>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-lg bg-secondary border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
          {data.profileImageUrl ? (
            <img src={data.profileImageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <User className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate">
            {data.fullName || "Your Name"}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {data.publicTitle || "Your public title"}
          </p>
          {data.valueStatement && (
            <p className="text-xs text-muted-foreground/70 mt-1 italic">
              "{data.valueStatement}"
            </p>
          )}
        </div>
      </div>

      {/* Badges */}
      {(data.highestLevel || allAchievements.length > 0 || data.experienceTypes.length > 0) && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium">
            <Award className="h-3 w-3" /> Credentials
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.highestLevel && (
              <span className="px-2 py-0.5 rounded text-[11px] bg-secondary text-foreground/80 border border-border">
                {data.highestLevel}
              </span>
            )}
            {data.experienceTypes.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded text-[11px] bg-secondary text-foreground/80 border border-border">
                {t}
              </span>
            ))}
            {allAchievements.map((a, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 rounded text-[11px] border ${
                  data.customAchievements.includes(a)
                    ? "bg-accent border-border text-foreground/60 italic"
                    : "bg-secondary text-foreground/80 border-border"
                }`}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Expertise */}
      {allExpertise.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium">
            <Star className="h-3 w-3" /> Expertise
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allExpertise.map((e, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 rounded text-[11px] border ${
                  data.customExpertise.includes(e)
                    ? "bg-accent border-border text-foreground/60 italic"
                    : "bg-secondary text-foreground/80 border-border"
                }`}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Clip Types */}
      {allClipTypes.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium">
            <Film className="h-3 w-3" /> Recommended Clips
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allClipTypes.map((c, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-secondary text-foreground/80 border border-border">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Example Questions */}
      {allQuestions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium">
            <MessageSquare className="h-3 w-3" /> Example Questions
          </div>
          <ul className="space-y-1">
            {allQuestions.map((q, i) => (
              <li key={i} className="text-xs text-foreground/70 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:h-1 before:w-1 before:rounded-full before:bg-muted-foreground/40">
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Submission Guide */}
      {allPrefs.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium">
            <ClipboardList className="h-3 w-3" /> Submission Guide
          </div>
          <ul className="space-y-1">
            {allPrefs.map((p, i) => (
              <li key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                <Check className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
