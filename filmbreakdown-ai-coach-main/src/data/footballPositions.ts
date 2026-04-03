// Football position data for elite athlete onboarding

export type PositionGroup = "Offense" | "Defense" | "Special Teams";

export interface FootballPosition {
  id: string;
  label: string;
  abbreviation: string;
  group: PositionGroup;
}

export const footballPositions: FootballPosition[] = [
  // Offense
  { id: "qb", label: "Quarterback", abbreviation: "QB", group: "Offense" },
  { id: "rb", label: "Running Back", abbreviation: "RB", group: "Offense" },
  { id: "wr", label: "Wide Receiver", abbreviation: "WR", group: "Offense" },
  { id: "te", label: "Tight End", abbreviation: "TE", group: "Offense" },
  { id: "ol", label: "Offensive Line", abbreviation: "OL", group: "Offense" },
  // Defense
  { id: "dl", label: "Defensive Line", abbreviation: "DL", group: "Defense" },
  { id: "lb", label: "Linebacker", abbreviation: "LB", group: "Defense" },
  { id: "db", label: "Defensive Back", abbreviation: "DB", group: "Defense" },
  // Special Teams
  { id: "k", label: "Kicker / Punter", abbreviation: "K/P", group: "Special Teams" },
  { id: "rs", label: "Return Specialist", abbreviation: "RS", group: "Special Teams" },
];

export const positionSkills: Record<string, string[]> = {
  qb: [
    "Throwing Mechanics", "Footwork", "Release Speed", "Arm Strength", "Accuracy",
    "Pre-Snap Reads", "Progressions", "Coverage Recognition", "Decision Making",
    "Pocket Presence", "Pressure Management", "Timing & Anticipation",
    "Off-Platform Throws", "Play Extension",
  ],
  wr: [
    "Release Techniques", "Route Running", "Separation", "Route Tempo",
    "Hands / Catching", "Contested Catches", "Ball Tracking", "Footwork",
    "Change of Direction", "YAC Ability", "Coverage Recognition", "Route Adjustments",
  ],
  rb: [
    "Vision", "Patience", "Cutback Ability", "Burst / Acceleration",
    "Change of Direction", "Elusiveness", "Balance", "Contact Balance",
    "Breaking Tackles", "Pass Protection", "Route Running", "Hands / Catching",
  ],
  te: [
    "Route Running", "Hands / Catching", "Contested Catches", "Run Blocking",
    "Pass Protection", "Footwork", "Leverage", "Coverage Recognition",
    "Alignment & Assignments",
  ],
  ol: [
    "Pass Sets", "Hand Placement", "Anchor Strength", "Run Blocking",
    "Drive Blocking", "Pulling Technique", "Footwork", "Leverage", "Pad Level",
    "Blitz Pickup", "Assignment Recognition", "Communication",
  ],
  dl: [
    "Pass Rush Moves", "Hand Usage", "Get-Off / Explosion", "Gap Control",
    "Block Shedding", "Tackling", "Leverage", "Strength",
  ],
  lb: [
    "Run Fits", "Block Shedding", "Tackling", "Zone Coverage", "Man Coverage",
    "Play Recognition", "Gap Responsibility", "Pursuit Angles",
    "Blitz Timing", "Pass Rush Ability",
  ],
  db: [
    "Man Coverage", "Zone Coverage", "Press Technique", "Ball Tracking",
    "Interceptions", "Pass Breakups", "Footwork", "Hip Fluidity",
    "Change of Direction", "Route Recognition", "Eye Discipline",
  ],
  k: [
    "Kick Accuracy", "Distance / Power", "Ball Contact", "Consistency",
  ],
  rs: [
    "Vision", "Decision Making", "Ball Security", "Open Field Running",
    "Burst", "Change of Direction",
  ],
};

export const universalSkills = [
  "Film Study", "Mental Approach", "Consistency", "Confidence", "Game Awareness",
];

export const positionTitleSuggestions: Record<string, string[]> = {
  qb: ["Quarterback Mechanics & Reads", "QB Development & Film Review", "Quarterback Pocket Presence Specialist"],
  wr: ["Wide Receiver Route Running & Separation", "WR Release & Route Specialist", "Wide Receiver Development & Technique"],
  rb: ["Running Back Vision & Burst", "RB Development & Film Review", "Running Back Technique Specialist"],
  te: ["Tight End Development & Technique", "TE Route Running & Blocking Specialist", "Tight End Film Review"],
  ol: ["Offensive Line Technique & Film Review", "OL Pass Protection Specialist", "Offensive Line Development"],
  dl: ["Defensive Line Pass Rush & Technique", "DL Development & Film Review", "Defensive Line Specialist"],
  lb: ["Linebacker Film Review & Development", "LB Run Fits & Coverage Specialist", "Linebacker Technique & Reads"],
  db: ["Defensive Back Coverage & Technique", "DB Ball Skills & Film Review", "Defensive Back Development"],
  k: ["Kicking Mechanics & Consistency", "Kicker / Punter Development", "Special Teams Specialist"],
  rs: ["Return Game Vision & Decision Making", "Return Specialist Development", "Special Teams Film Review"],
};

export const clipTypes = [
  "Game Film", "Practice Reps", "Position Drills", "1-on-1 Reps",
  "Team Period", "Red Zone Clips", "Goal Line Situations",
  "Third Down Situations", "Two-Minute Drill", "Scramble Situations",
];

export const positionExampleQuestions: Record<string, string[]> = {
  qb: [
    "Am I reading the defense correctly pre-snap?",
    "Is my throwing motion efficient?",
    "How can I speed up my release?",
    "Where should my eyes go on this play?",
    "Am I getting through my progression fast enough?",
  ],
  wr: [
    "Why am I not creating separation?",
    "Is my release beating press coverage?",
    "Am I dropping my weight correctly at the top of the route?",
    "How can I track the deep ball better?",
    "What is making this route look slow?",
  ],
  rb: [
    "Am I pressing the hole correctly?",
    "Did I miss the cutback lane here?",
    "How can I become more explosive through contact?",
    "Is my pass protection technique correct?",
    "Am I being too impatient on outside zone?",
  ],
  te: [
    "Is my blocking leverage correct here?",
    "How can I improve my route detail?",
    "Am I getting enough separation at the top?",
    "Should my eyes be inside or outside on this release?",
    "How can I improve as both a blocker and receiver?",
  ],
  ol: [
    "Is my pass set too shallow here?",
    "Am I losing leverage at contact?",
    "Where is my hand placement going wrong?",
    "How can I improve my anchor?",
    "Did I identify the pressure correctly?",
  ],
  dl: [
    "Why am I getting stuck on blocks?",
    "Is my first step explosive enough?",
    "What pass rush move fits this situation best?",
    "How can I improve my hand usage?",
    "Am I attacking the correct gap?",
  ],
  lb: [
    "Did I fit this run correctly?",
    "Are my pursuit angles too flat?",
    "How can I improve in zone coverage?",
    "Was I late reading this play?",
    "Should I have triggered downhill sooner?",
  ],
  db: [
    "Am I in the right position in this coverage?",
    "Why am I opening my hips too early?",
    "How can I play the ball better downfield?",
    "Are my eyes in the wrong place here?",
    "Is my press technique effective?",
  ],
  k: [
    "Is my contact point consistent?",
    "How can I improve distance without losing control?",
    "What is wrong with my approach here?",
  ],
  rs: [
    "Did I make the right decision fielding this?",
    "How can I set up blocks better?",
    "Am I missing open space in the return game?",
  ],
};

export const highestLevels = [
  "High School", "College", "Division I", "Professional",
];

export const experienceTypes = [
  "Former Player", "Current Player", "Coach", "Trainer", "Film Analyst",
];

export const standardAchievements = [
  "Team Captain", "All-Conference", "All-American", "Pro Experience",
  "Coaching Staff Experience", "500+ Film Sessions", "Position Specialist",
];

export const submissionPreferences = [
  { id: "pre-snap", label: "Include pre-snap footage" },
  { id: "post-snap", label: "Include post-snap result" },
  { id: "full-rep", label: "Show full rep, not just highlight ending" },
  { id: "endzone", label: "End zone angle preferred" },
  { id: "sideline", label: "Sideline angle preferred" },
  { id: "multiple-reps", label: "Multiple reps of the same concept preferred" },
  { id: "game-context", label: "Include game situation/context" },
  { id: "down-distance", label: "Include down and distance" },
];
