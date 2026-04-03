// Sport-specific skill categories for the Library feature
export const skillCategoriesBySport: Record<string, string[]> = {
  Basketball: ["Shooting", "Ball Handling", "Footwork", "Defense", "Passing", "Rebounding", "Court Vision"],
  Football: ["Release", "Route Running", "Separation", "Footwork", "Hands", "Film Study", "Throwing", "Coverage"],
  Soccer: ["First Touch", "Passing", "Dribbling", "Positioning", "Finishing", "Defending", "Set Pieces"],
  Baseball: ["Pitching", "Hitting", "Fielding", "Base Running", "Arm Mechanics", "Catching"],
  Tennis: ["Serve", "Forehand", "Backhand", "Volley", "Footwork", "Strategy", "Return"],
  Golf: ["Driver", "Irons", "Short Game", "Putting", "Swing Mechanics", "Course Management"],
  "Track & Field": ["Sprinting", "Starts", "Hurdles", "Form", "Endurance", "Recovery"],
  Lacrosse: ["Shooting", "Stick Skills", "Defense", "Face-offs", "Dodging", "Feeding"],
  Crew: ["Technique", "Power", "Timing", "Recovery", "Race Strategy"],
};

export function getSkillCategories(sport: string): string[] {
  return skillCategoriesBySport[sport] || ["General", "Technique", "Drills", "Strategy"];
}
