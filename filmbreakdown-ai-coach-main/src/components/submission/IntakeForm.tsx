import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/FileUpload";
import { sports } from "@/data/mockData";
import { footballPositions, positionSkills, universalSkills } from "@/data/footballPositions";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const VIDEO_TYPES = ["Game film", "Practice film", "Drill footage", "Training clip"];
const ISSUE_CONTEXTS = ["Games", "Practice", "Both"];
const SKILL_AREAS = [
  "Mechanics / technique",
  "Footwork",
  "Throwing / passing",
  "Shooting / striking",
  "Hitting",
  "Defense",
  "Speed / explosiveness",
  "Agility / movement",
  "Decision making",
  "Positioning / awareness",
  "Confidence / mental side",
  "Other",
];

export interface IntakeData {
  name: string;
  email: string;
  sport: string;
  position: string;
  age: number;
  videoType: string;
  issueContext: string;
  skillArea: string;
}

interface IntakeFormProps {
  onSubmit: (data: IntakeData) => void;
}

const positionGroups = ["Offense", "Defense", "Special Teams"] as const;
const groupedPositions = positionGroups.map((group) => ({
  group,
  positions: footballPositions.filter((p) => p.group === group),
}));

function getSkillOptions(sport: string, positionValue: string): string[] {
  if (sport === "Football" && positionValue) {
    const pos = footballPositions.find((p) => p.label === positionValue);
    if (pos) {
      return [...(positionSkills[pos.id] || []), ...universalSkills];
    }
  }
  return SKILL_AREAS;
}

export function IntakeForm({ onSubmit }: IntakeFormProps) {
  const [data, setData] = useState<IntakeData>({
    name: "",
    email: "",
    sport: "",
    position: "",
    age: 0,
    videoType: "",
    issueContext: "",
    skillArea: "",
  });

  const isFootball = data.sport === "Football";
  const skillOptions = getSkillOptions(data.sport, data.position);

  const handleSportChange = (v: string) => {
    setData({ ...data, sport: v, position: "", skillArea: "" });
  };

  const handlePositionChange = (v: string) => {
    if (isFootball) {
      setData({ ...data, position: v, skillArea: "" });
    } else {
      setData({ ...data, position: v });
    }
  };

  const isValid =
    data.name && data.email && data.sport && data.position && data.age > 0 && data.videoType && data.issueContext && data.skillArea;

  return (
    <motion.div
      key="intake-form"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-semibold text-foreground tracking-tight">Upload Your Film</h1>
      <p className="text-muted-foreground mt-2 mb-8">Tell us a bit about yourself and what you're submitting.</p>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Your name" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="you@email.com" className="mt-1.5" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Sport</Label>
            <Select value={data.sport} onValueChange={handleSportChange}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {sports.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Position / Event</Label>
            {isFootball ? (
              <Select value={data.position} onValueChange={handlePositionChange}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select position" /></SelectTrigger>
                <SelectContent>
                  {groupedPositions.map(({ group, positions }) => (
                    <SelectGroup key={group}>
                      <SelectLabel>{group}</SelectLabel>
                      {positions.map((p) => (
                        <SelectItem key={p.id} value={p.label}>
                          {p.abbreviation} — {p.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={data.position}
                onChange={(e) => handlePositionChange(e.target.value)}
                placeholder="e.g., Point Guard"
                className="mt-1.5"
              />
            )}
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min={8}
              max={25}
              value={data.age || ""}
              onChange={(e) => setData({ ...data, age: parseInt(e.target.value) || 0 })}
              placeholder="14"
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>What are you uploading?</Label>
            <Select value={data.videoType} onValueChange={(v) => setData({ ...data, videoType: v })}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                {VIDEO_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Where does the issue happen?</Label>
            <Select value={data.issueContext} onValueChange={(v) => setData({ ...data, issueContext: v })}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {ISSUE_CONTEXTS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Skill Area</Label>
          <Select value={data.skillArea} onValueChange={(v) => setData({ ...data, skillArea: v })}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder={isFootball && !data.position ? "Select a position first" : "What do you want help with?"} /></SelectTrigger>
            <SelectContent>
              {skillOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Video Upload <span className="text-muted-foreground font-normal">(optional — you can add later)</span></Label>
          <div className="mt-1.5">
            <FileUpload />
          </div>
        </div>

        <Button onClick={() => isValid && onSubmit(data)} disabled={!isValid} className="w-full gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}