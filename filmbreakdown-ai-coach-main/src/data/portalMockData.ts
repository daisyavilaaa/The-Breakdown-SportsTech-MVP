import athlete3 from "@/assets/athlete-3.jpg";

export interface PortalAthlete {
  id: string;
  name: string;
  sport: string;
  specialty: string;
  image: string;
  bio: string;
  achievements: string[];
  expertise: string[];
  reviewStyle: string[];
  submissionGuide: string[];
}

export const currentAthlete: PortalAthlete = {
  id: "marcus-chen",
  name: "Marcus Chen",
  sport: "Football",
  specialty: "Wide Receiver Route Running & Separation",
  image: athlete3,
  bio: "Former D1 All-Conference wide receiver with 300+ film breakdowns completed. Specializes in route running mechanics, separation techniques, and release footwork.",
  achievements: ["All-Conference WR", "300+ Film Breakdowns", "Former D1 Athlete"],
  expertise: ["Route Running", "Release Techniques", "Separation", "Footwork", "Press Coverage Beats", "Cut Mechanics"],
  reviewStyle: [
    "🎥 Video breakdowns",
    "🧠 Technical analysis",
    "⏱ Short, actionable feedback",
  ],
  submissionGuide: [
    "End zone or sideline angles preferred",
    "Include full route rep",
    "Show multiple reps if possible",
    "Game footage over practice when available",
  ],
};

export interface BreakdownRequest {
  id: string;
  athleteName: string;
  age: number;
  position: string;
  sport: string;
  title: string;
  headline: string;
  diagnosisSummary: string;
  diagnosisFull: string;
  whatToLookFor: string[];
  rootCategory: string;
  aiSummary: string;
  originalQuestion: string;
  thumbnailColor: string;
  estimatedMinutes: number;
  submittedAt: string;
  skillArea: string;
}

export const mockRequests: BreakdownRequest[] = [
  {
    id: "req-001",
    athleteName: "Jaylen W.",
    age: 15,
    position: "WR",
    sport: "Football",
    title: "Struggling to create separation on cuts",
    headline: "Balance disruption and posterior weight shift during deceleration on comeback routes",
    diagnosisSummary: "Likely issue: inefficient weight transfer and high pad level entering breaks",
    diagnosisFull: "Athlete demonstrates a consistent pattern of rising pad level 2-3 steps before the break point, shifting center of mass posteriorly. This causes a momentary stall in deceleration, giving the defender time to recover. The foot strike is landing heel-first rather than on the ball of the foot, reducing the ability to redirect explosively.",
    whatToLookFor: [
      "Check center of mass at break point",
      "Watch hip sink during deceleration",
      "Evaluate foot strike positioning on cuts",
      "Observe torso angle entering the break",
    ],
    rootCategory: "Balance / Body Control Issue",
    aiSummary: "Likely issue: foot speed into break and pad level entering cuts",
    originalQuestion: "I can't get open on my cuts. Defenders always stay with me even when I feel like I'm running the route right.",
    thumbnailColor: "from-primary/30 to-secondary",
    estimatedMinutes: 2,
    submittedAt: "2026-03-18T09:30:00Z",
    skillArea: "Route Running",
  },
  {
    id: "req-002",
    athleteName: "Darius M.",
    age: 17,
    position: "WR",
    sport: "Football",
    title: "Release off the line vs press coverage",
    headline: "Delayed hand timing and narrow base disrupting initial release mechanics against press",
    diagnosisSummary: "Possible issue: hand placement timing and initial step mechanics off the line",
    diagnosisFull: "Athlete's initial step is consistently short and flat-footed when facing press coverage. Hand usage is reactive rather than proactive — swatting at defender's hands after contact rather than attacking leverage points pre-contact. Base narrows significantly in first two steps, reducing power and balance.",
    whatToLookFor: [
      "Watch first step length and angle",
      "Check hand timing relative to defender contact",
      "Evaluate base width through first 3 steps",
      "Observe weight distribution at snap",
    ],
    rootCategory: "Release Mechanics Issue",
    aiSummary: "Possible issue: hand placement timing and initial step mechanics off the line",
    originalQuestion: "When corners press me at the line, I can't get a clean release. I feel stuck for the first few steps.",
    thumbnailColor: "from-accent/20 to-muted",
    estimatedMinutes: 3,
    submittedAt: "2026-03-17T14:15:00Z",
    skillArea: "Release Techniques",
  },
  {
    id: "req-003",
    athleteName: "Tyler R.",
    age: 13,
    position: "WR",
    sport: "Football",
    title: "Running the wrong depth on routes",
    headline: "Inconsistent stride length causing premature route breaks and depth shortfall",
    diagnosisSummary: "Likely issue: stride length inconsistency and lack of route-stem awareness",
    diagnosisFull: "Athlete's stride length varies significantly between reps, leading to inconsistent depth on vertical stems. The athlete appears to be sprinting at max effort rather than controlling tempo, which causes early deceleration. There's also a tendency to round off the top of routes rather than driving vertically before breaking.",
    whatToLookFor: [
      "Count stride length consistency across reps",
      "Watch tempo control on vertical stems",
      "Check if route rounds off vs sharp break",
      "Evaluate depth markers relative to coverage",
    ],
    rootCategory: "Route Discipline Issue",
    aiSummary: "Likely issue: stride length inconsistency and lack of route-stem awareness",
    originalQuestion: "My coach says I'm not getting deep enough on my routes but I feel like I'm running fast.",
    thumbnailColor: "from-secondary to-background",
    estimatedMinutes: 2,
    submittedAt: "2026-03-16T11:00:00Z",
    skillArea: "Route Running",
  },
  {
    id: "req-004",
    athleteName: "Chris B.",
    age: 16,
    position: "WR",
    sport: "Football",
    title: "Can't catch consistently over the middle",
    headline: "Pre-contact flinch response causing early eye departure and hand positioning breakdown",
    diagnosisSummary: "Possible issue: body positioning and hand technique under traffic pressure",
    diagnosisFull: "Athlete shows a consistent flinch pattern when anticipating contact over the middle. Eyes pull off the ball 1-2 steps before the catch point, and hands transition from diamond catch position to a body-catch posture. This is likely a confidence/anticipation issue rather than a pure technical deficiency.",
    whatToLookFor: [
      "Watch eye tracking through the catch point",
      "Check hand position transition under pressure",
      "Evaluate body posture approaching traffic",
      "Note timing of flinch relative to contact",
      "Compare catch mechanics in open field vs traffic",
    ],
    rootCategory: "Catch Mechanics / Confidence Issue",
    aiSummary: "Possible issue: body positioning and hand technique under traffic pressure",
    originalQuestion: "I drop a lot of passes over the middle. I think I'm hearing footsteps and pulling my eyes off the ball.",
    thumbnailColor: "from-primary/20 to-card",
    estimatedMinutes: 2,
    submittedAt: "2026-03-15T16:45:00Z",
    skillArea: "Catching",
  },
];
