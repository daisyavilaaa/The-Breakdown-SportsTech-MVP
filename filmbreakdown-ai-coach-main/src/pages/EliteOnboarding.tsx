import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { GeometricBackground } from "@/components/GeometricBackground";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

import { ProfilePreview } from "@/components/onboarding/ProfilePreview";
import { ChipSelect } from "@/components/onboarding/ChipSelect";
import { AddCustomField } from "@/components/onboarding/AddCustomField";
import {
  footballPositions,
  positionSkills,
  universalSkills,
  positionTitleSuggestions,
  clipTypes,
  positionExampleQuestions,
  highestLevels,
  experienceTypes,
  standardAchievements,
  submissionPreferences,
  type FootballPosition,
  type PositionGroup,
} from "@/data/footballPositions";

const TOTAL_STEPS = 9;

const stepLabels = [
  "Identity",
  "Title",
  "Credentials",
  "Expertise",
  "Clip Types",
  "Questions",
  "Statement",
  "Submission Guide",
  "Photo",
];

export default function EliteOnboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Step 1
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState<FootballPosition | null>(null);

  // Step 2
  const [publicTitle, setPublicTitle] = useState("");

  // Step 3
  const [highestLevel, setHighestLevel] = useState("");
  const [selectedExpTypes, setSelectedExpTypes] = useState<string[]>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<string[]>([]);
  const [customAchievements, setCustomAchievements] = useState<string[]>([]);

  // Step 4
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [customExpertise, setCustomExpertise] = useState<string[]>([]);

  // Step 5
  const [selectedClipTypes, setSelectedClipTypes] = useState<string[]>([]);
  const [customClipTypes, setCustomClipTypes] = useState<string[]>([]);

  // Step 6
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);

  // Step 7
  const [valueStatement, setValueStatement] = useState("");

  // Step 8
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);
  const [customPrefs, setCustomPrefs] = useState<string[]>([]);

  // Step 9
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const toggleArrayItem = useCallback((arr: string[], item: string, max?: number) => {
    if (arr.includes(item)) return arr.filter((i) => i !== item);
    if (max && arr.length >= max) return arr;
    return [...arr, item];
  }, []);

  // When position changes, auto-generate title and reset position-dependent selections
  const handlePositionSelect = (pos: FootballPosition) => {
    setPosition(pos);
    const suggestions = positionTitleSuggestions[pos.id];
    if (suggestions?.[0]) setPublicTitle(suggestions[0]);
    setSelectedExpertise([]);
    setCustomExpertise([]);
    setSelectedQuestions([]);
    setCustomQuestions([]);
  };

  const canProceed = () => {
    switch (step) {
      case 0: return fullName.trim().length > 0 && position !== null;
      case 1: return publicTitle.trim().length > 0 && publicTitle.length <= 60;
      case 2: return true;
      case 3: return (selectedExpertise.length + customExpertise.length) > 0;
      case 4: return (selectedClipTypes.length + customClipTypes.length) > 0;
      case 5: return (selectedQuestions.length + customQuestions.length) > 0;
      case 6: return valueStatement.trim().length > 0 && valueStatement.length <= 120;
      case 7: return true;
      case 8: return true;
      default: return true;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `profile-images/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("library-videos").upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("library-videos").getPublicUrl(path);
      setProfileImageUrl(urlData.publicUrl);
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!position) return;
    if (!user) {
      toast.error("Please sign in before completing your profile.");
      navigate("/login");
      return;
    }
    setSubmitting(true);
    try {
      const prefLabels = selectedPrefs.map(
        (id) => submissionPreferences.find((p) => p.id === id)?.label || id
      );

      const { error } = await supabase.from("elite_profiles").insert({
        full_name: fullName.trim(),
        sport: "Football",
        position_id: position.id,
        position_label: position.label,
        public_title: publicTitle.trim(),
        value_statement: valueStatement.trim() || null,
        highest_level: highestLevel || null,
        experience_types: selectedExpTypes,
        achievements: selectedAchievements,
        custom_achievements: customAchievements,
        expertise: selectedExpertise,
        custom_expertise: customExpertise,
        clip_types: selectedClipTypes,
        custom_clip_types: customClipTypes,
        example_questions: selectedQuestions,
        custom_questions: customQuestions,
        submission_preferences: prefLabels,
        custom_submission_preferences: customPrefs,
        profile_image_url: profileImageUrl,
        user_id: user.id,
      });
      if (error) throw error;
      toast.success("Profile created!");
      navigate("/portal");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const previewData = {
    fullName,
    positionLabel: position?.label || "",
    publicTitle,
    valueStatement,
    highestLevel,
    experienceTypes: selectedExpTypes,
    achievements: selectedAchievements,
    customAchievements,
    expertise: selectedExpertise,
    customExpertise,
    clipTypes: selectedClipTypes,
    customClipTypes,
    exampleQuestions: selectedQuestions,
    customQuestions,
    submissionPreferences: [
      ...selectedPrefs.map((id) => submissionPreferences.find((p) => p.id === id)?.label || id),
      ...customPrefs,
    ],
    customSubmissionPreferences: customPrefs,
    profileImageUrl,
  };

  const grouped = footballPositions.reduce<Record<PositionGroup, FootballPosition[]>>(
    (acc, p) => { acc[p.group].push(p); return acc; },
    { Offense: [], Defense: [], "Special Teams": [] }
  );

  const posSkills = position ? positionSkills[position.id] || [] : [];
  const posQuestions = position ? positionExampleQuestions[position.id] || [] : [];
  const allExpertiseOptions = [...posSkills, ...universalSkills];

  return (
    <div className="min-h-screen gradient-page">
      <Navbar />
      <main className="container-page py-12">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
              Step {step + 1} of {TOTAL_STEPS} — {stepLabels[step]}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {Math.round(((step + 1) / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-foreground/30 rounded-full"
              animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step 0: Identity */}
                {step === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Basic Identity</h2>
                      <p className="text-sm text-muted-foreground mt-1">Let's start with the basics.</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-foreground/80 mb-1.5 block">Full Name</label>
                        <Input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="h-10 bg-secondary border-border text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-foreground/80 mb-1.5 block">Sport</label>
                        <div className="px-3 py-2 rounded-md bg-secondary border border-border text-sm text-foreground/60">
                          Football
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-foreground/80 mb-3 block">Position</label>
                        <div className="space-y-4">
                          {(Object.keys(grouped) as PositionGroup[]).map((group) => (
                            <div key={group}>
                              <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium mb-2">{group}</p>
                              <div className="flex flex-wrap gap-2">
                                {grouped[group].map((pos) => (
                                  <button
                                    key={pos.id}
                                    type="button"
                                    onClick={() => handlePositionSelect(pos)}
                                    className={cn(
                                      "px-3 py-2 rounded-md text-xs font-medium transition-all duration-150 border",
                                      position?.id === pos.id
                                        ? "bg-foreground/10 border-foreground/20 text-foreground"
                                        : "bg-secondary border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                                    )}
                                  >
                                    {pos.label} ({pos.abbreviation})
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Title */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Public Title</h2>
                      <p className="text-sm text-muted-foreground mt-1">This appears under your name on your profile card.</p>
                    </div>
                    {position && positionTitleSuggestions[position.id] && (
                      <div>
                        <label className="text-xs font-medium text-foreground/80 mb-2 block">Suggested titles</label>
                        <div className="space-y-2">
                          {positionTitleSuggestions[position.id].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setPublicTitle(s)}
                              className={cn(
                                "block w-full text-left px-4 py-2.5 rounded-md text-sm transition-all duration-150 border",
                                publicTitle === s
                                  ? "bg-foreground/10 border-foreground/20 text-foreground"
                                  : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="text-xs font-medium text-foreground/80 mb-1.5 block">Custom title</label>
                      <Input
                        value={publicTitle}
                        onChange={(e) => setPublicTitle(e.target.value.slice(0, 60))}
                        placeholder="Or write your own..."
                        className="h-10 bg-secondary border-border text-sm"
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">{publicTitle.length}/60</p>
                    </div>
                  </div>
                )}

                {/* Step 2: Credentials */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Credibility Badges</h2>
                      <p className="text-sm text-muted-foreground mt-1">Build trust with your credentials.</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground/80 mb-2 block">Highest Level Played</label>
                      <div className="flex flex-wrap gap-2">
                        {highestLevels.map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setHighestLevel(highestLevel === level ? "" : level)}
                            className={cn(
                              "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 border",
                              highestLevel === level
                                ? "bg-foreground/10 border-foreground/20 text-foreground"
                                : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground/80 mb-2 block">Experience Type</label>
                      <ChipSelect
                        options={experienceTypes}
                        selected={selectedExpTypes}
                        onToggle={(v) => setSelectedExpTypes((p) => toggleArrayItem(p, v))}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground/80 mb-2 block">
                        Achievements <span className="text-muted-foreground">(up to 3)</span>
                      </label>
                      <ChipSelect
                        options={[...standardAchievements, ...customAchievements]}
                        selected={selectedAchievements}
                        onToggle={(v) => setSelectedAchievements((p) => toggleArrayItem(p, v, 3))}
                        max={3}
                        customValues={customAchievements}
                      />
                      <AddCustomField
                        placeholder="Add your own achievement"
                        onAdd={(v) => {
                          setCustomAchievements((p) => [...p, v]);
                          if (selectedAchievements.length < 3) {
                            setSelectedAchievements((p) => [...p, v]);
                          }
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Expertise */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Areas of Expertise</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Select the skills you're best at reviewing. <span className="text-foreground/60">Up to 5.</span>
                      </p>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium mb-2 block">
                        {position?.label} Skills
                      </label>
                      <ChipSelect
                        options={[...posSkills, ...customExpertise]}
                        selected={selectedExpertise}
                        onToggle={(v) => setSelectedExpertise((p) => toggleArrayItem(p, v, 5))}
                        max={5}
                        customValues={customExpertise}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium mb-2 block">
                        Universal Skills
                      </label>
                      <ChipSelect
                        options={universalSkills}
                        selected={selectedExpertise}
                        onToggle={(v) => setSelectedExpertise((p) => toggleArrayItem(p, v, 5))}
                        max={5}
                      />
                    </div>
                    <AddCustomField
                      placeholder="Add your own expertise"
                      onAdd={(v) => {
                        setCustomExpertise((p) => [...p, v]);
                        if (selectedExpertise.length < 5) {
                          setSelectedExpertise((p) => [...p, v]);
                        }
                      }}
                    />
                  </div>
                )}

                {/* Step 4: Clip Types */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Recommended Clip Types</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        What types of film should athletes send you? <span className="text-foreground/60">Up to 4.</span>
                      </p>
                    </div>
                    <ChipSelect
                      options={[...clipTypes, ...customClipTypes]}
                      selected={selectedClipTypes}
                      onToggle={(v) => setSelectedClipTypes((p) => toggleArrayItem(p, v, 4))}
                      max={4}
                      customValues={customClipTypes}
                    />
                    <AddCustomField
                      placeholder="Add your own clip type"
                      onAdd={(v) => {
                        setCustomClipTypes((p) => [...p, v]);
                        if (selectedClipTypes.length < 4) {
                          setSelectedClipTypes((p) => [...p, v]);
                        }
                      }}
                    />
                  </div>
                )}

                {/* Step 5: Example Questions */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Example Questions</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        What types of questions do you want to answer? <span className="text-foreground/60">Up to 4.</span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      {posQuestions.map((q) => {
                        const isSelected = selectedQuestions.includes(q);
                        const isDisabled = !isSelected && selectedQuestions.length >= 4;
                        return (
                          <button
                            key={q}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => setSelectedQuestions((p) => toggleArrayItem(p, q, 4))}
                            className={cn(
                              "block w-full text-left px-4 py-2.5 rounded-md text-sm transition-all duration-150 border",
                              isSelected
                                ? "bg-foreground/10 border-foreground/20 text-foreground"
                                : isDisabled
                                  ? "bg-secondary/50 border-border/50 text-muted-foreground/40 cursor-not-allowed"
                                  : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {isSelected && <Check className="h-3 w-3 flex-shrink-0" />}
                              {q}
                            </span>
                          </button>
                        );
                      })}
                      {customQuestions.map((q) => {
                        const isSelected = selectedQuestions.includes(q);
                        return (
                          <button
                            key={q}
                            type="button"
                            onClick={() => setSelectedQuestions((p) => toggleArrayItem(p, q, 4))}
                            className={cn(
                              "block w-full text-left px-4 py-2.5 rounded-md text-sm transition-all duration-150 border italic",
                              isSelected
                                ? "bg-foreground/10 border-foreground/20 text-foreground"
                                : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {isSelected && <Check className="h-3 w-3 flex-shrink-0" />}
                              {q}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <AddCustomField
                      placeholder="Add your own example question"
                      maxLength={120}
                      onAdd={(v) => {
                        setCustomQuestions((p) => [...p, v]);
                        if (selectedQuestions.length < 4) {
                          setSelectedQuestions((p) => [...p, v]);
                        }
                      }}
                    />
                  </div>
                )}

                {/* Step 6: Value Statement */}
                {step === 6 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Signature Value Statement</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        What do you help athletes improve most? One concise sentence.
                      </p>
                    </div>
                    <div>
                      <Input
                        value={valueStatement}
                        onChange={(e) => setValueStatement(e.target.value.slice(0, 120))}
                        placeholder="e.g. Cleaner mechanics and faster decision making"
                        className="h-10 bg-secondary border-border text-sm"
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">{valueStatement.length}/120</p>
                    </div>
                  </div>
                )}

                {/* Step 7: Submission Guide */}
                {step === 7 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Submission Guide</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        What do you want included in submitted film?
                      </p>
                    </div>
                    <div className="space-y-3">
                      {submissionPreferences.map((pref) => {
                        const isOn = selectedPrefs.includes(pref.id);
                        return (
                          <button
                            key={pref.id}
                            type="button"
                            onClick={() => setSelectedPrefs((p) =>
                              p.includes(pref.id) ? p.filter((x) => x !== pref.id) : [...p, pref.id]
                            )}
                            className={cn(
                              "flex items-center gap-3 w-full text-left px-4 py-3 rounded-md text-sm transition-all duration-150 border",
                              isOn
                                ? "bg-foreground/10 border-foreground/20 text-foreground"
                                : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <div className={cn(
                              "h-4 w-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors",
                              isOn ? "bg-foreground/20 border-foreground/30" : "border-border"
                            )}>
                              {isOn && <Check className="h-3 w-3" />}
                            </div>
                            {pref.label}
                          </button>
                        );
                      })}
                    </div>
                    <AddCustomField
                      placeholder="Add your own submission preference"
                      onAdd={(v) => setCustomPrefs((p) => [...p, v])}
                    />
                    {customPrefs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {customPrefs.map((cp, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-accent border border-border text-foreground/60 italic flex items-center gap-1">
                            {cp}
                            <button
                              type="button"
                              onClick={() => setCustomPrefs((p) => p.filter((_, idx) => idx !== i))}
                              className="text-muted-foreground hover:text-foreground ml-0.5"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 8: Photo */}
                {step === 8 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Profile Image</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload a professional headshot. This will appear on your public profile.
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="h-28 w-28 rounded-lg bg-secondary border border-border flex items-center justify-center overflow-hidden">
                        {profileImageUrl ? (
                          <img src={profileImageUrl} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-secondary border border-border text-foreground hover:bg-accent transition-colors">
                          <Upload className="h-4 w-4" />
                          {uploading ? "Uploading..." : profileImageUrl ? "Change Photo" : "Upload Photo"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploading}
                          />
                        </label>
                        <p className="text-[10px] text-muted-foreground mt-2">JPG or PNG, max 5MB</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {step === 0 ? "Cancel" : "Back"}
              </button>

              {step < TOTAL_STEPS - 1 ? (
                <button
                  type="button"
                  disabled={!canProceed()}
                  onClick={() => setStep(step + 1)}
                  className={cn(
                    "flex items-center gap-1.5 px-5 py-2 rounded-md text-sm font-medium transition-all duration-150",
                    canProceed()
                      ? "bg-foreground/10 border border-foreground/20 text-foreground hover:bg-foreground/15"
                      : "bg-secondary border border-border text-muted-foreground/40 cursor-not-allowed"
                  )}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleSubmit}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-md text-sm font-medium bg-foreground/10 border border-foreground/20 text-foreground hover:bg-foreground/15 transition-all duration-150"
                >
                  {submitting ? "Creating Profile..." : "Create Profile"}
                  <Check className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="sticky top-24">
              <ProfilePreview data={previewData} />
            </div>
          </div>
        </div>
      </main>
      <div className="relative">
        <GeometricBackground position="bottom" opacity={0.2} className="!h-40" />
      </div>
    </div>
  );
}
