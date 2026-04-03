import { athletes } from "@/data/mockData";

// Generate mock library videos for each athlete based on their sport and expertise
export const mockLibraryVideos = [
  // Jordan Smith - Basketball
  { id: "lv-001", athlete_id: "jordan-smith", title: "Catch-and-shoot footwork drill — proper base and alignment", skill_category: "Shooting", video_url: "", thumbnail_url: null, sport: "Basketball", created_at: "2026-03-20T10:00:00Z" },
  { id: "lv-002", athlete_id: "jordan-smith", title: "How to set your feet off a screen for a mid-range pull-up", skill_category: "Footwork", video_url: "", thumbnail_url: null, sport: "Basketball", created_at: "2026-03-18T14:00:00Z" },
  { id: "lv-003", athlete_id: "jordan-smith", title: "Guide hand placement and release point consistency", skill_category: "Shooting", video_url: "", thumbnail_url: null, sport: "Basketball", created_at: "2026-03-15T09:00:00Z" },
  { id: "lv-004", athlete_id: "jordan-smith", title: "Defensive slide technique and recovery angles", skill_category: "Defense", video_url: "", thumbnail_url: null, sport: "Basketball", created_at: "2026-03-12T11:00:00Z" },
  { id: "lv-005", athlete_id: "jordan-smith", title: "Ball handling warm-up routine I use every day", skill_category: "Ball Handling", video_url: "", thumbnail_url: null, sport: "Basketball", created_at: "2026-03-10T08:00:00Z" },

  // Maya Rodriguez - Soccer
  { id: "lv-006", athlete_id: "maya-rodriguez", title: "First touch under pressure — receiving with back to goal", skill_category: "First Touch", video_url: "", thumbnail_url: null, sport: "Soccer", created_at: "2026-03-21T10:00:00Z" },
  { id: "lv-007", athlete_id: "maya-rodriguez", title: "Switching play: weight of pass and body position", skill_category: "Passing", video_url: "", thumbnail_url: null, sport: "Soccer", created_at: "2026-03-19T13:00:00Z" },
  { id: "lv-008", athlete_id: "maya-rodriguez", title: "How to find space between the lines in a 4-3-3", skill_category: "Positioning", video_url: "", thumbnail_url: null, sport: "Soccer", created_at: "2026-03-16T15:00:00Z" },
  { id: "lv-009", athlete_id: "maya-rodriguez", title: "1v1 dribbling moves that actually work in games", skill_category: "Dribbling", video_url: "", thumbnail_url: null, sport: "Soccer", created_at: "2026-03-14T10:00:00Z" },

  // Marcus Chen - Football
  { id: "lv-010", athlete_id: "marcus-chen", title: "Pre-snap read progression — identifying Cover 2 vs Cover 3", skill_category: "Film Study", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-22T09:00:00Z" },
  { id: "lv-011", athlete_id: "marcus-chen", title: "Footwork in the pocket — proper drop mechanics", skill_category: "Footwork", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-20T11:00:00Z" },
  { id: "lv-012", athlete_id: "marcus-chen", title: "Throwing on the move — platform and arm slot", skill_category: "Throwing", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-17T14:00:00Z" },
  { id: "lv-013", athlete_id: "marcus-chen", title: "How to read the safety rotation post-snap", skill_category: "Film Study", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-15T10:00:00Z" },
  { id: "lv-014", athlete_id: "marcus-chen", title: "Release timing on slant and hitch routes", skill_category: "Route Running", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-13T09:00:00Z" },

  // Sarah Kim - Tennis
  { id: "lv-015", athlete_id: "sarah-kim", title: "Serve toss placement — consistency drill", skill_category: "Serve", video_url: "", thumbnail_url: null, sport: "Tennis", created_at: "2026-03-21T08:00:00Z" },
  { id: "lv-016", athlete_id: "sarah-kim", title: "Approach shot footwork into the net", skill_category: "Volley", video_url: "", thumbnail_url: null, sport: "Tennis", created_at: "2026-03-18T10:00:00Z" },
  { id: "lv-017", athlete_id: "sarah-kim", title: "Split step timing and recovery patterns", skill_category: "Footwork", video_url: "", thumbnail_url: null, sport: "Tennis", created_at: "2026-03-16T12:00:00Z" },

  // Tyler Jackson - Baseball
  { id: "lv-018", athlete_id: "tyler-jackson", title: "Hip-shoulder separation drill for velocity gains", skill_category: "Pitching", video_url: "", thumbnail_url: null, sport: "Baseball", created_at: "2026-03-22T07:00:00Z" },
  { id: "lv-019", athlete_id: "tyler-jackson", title: "Arm slot consistency — finding your natural release point", skill_category: "Arm Mechanics", video_url: "", thumbnail_url: null, sport: "Baseball", created_at: "2026-03-19T09:00:00Z" },
  { id: "lv-020", athlete_id: "tyler-jackson", title: "Breaking ball grip and wrist position breakdown", skill_category: "Pitching", video_url: "", thumbnail_url: null, sport: "Baseball", created_at: "2026-03-17T11:00:00Z" },
  { id: "lv-021", athlete_id: "tyler-jackson", title: "Flat ground throwing routine for arm health", skill_category: "Arm Mechanics", video_url: "", thumbnail_url: null, sport: "Baseball", created_at: "2026-03-14T08:00:00Z" },

  // David Park - Golf
  { id: "lv-022", athlete_id: "david-park", title: "Proper setup and alignment — the foundation of a good swing", skill_category: "Swing Mechanics", video_url: "", thumbnail_url: null, sport: "Golf", created_at: "2026-03-21T06:00:00Z" },
  { id: "lv-023", athlete_id: "david-park", title: "Chipping technique — controlling distance with one swing", skill_category: "Short Game", video_url: "", thumbnail_url: null, sport: "Golf", created_at: "2026-03-19T10:00:00Z" },
  { id: "lv-024", athlete_id: "david-park", title: "Reading greens and speed control on the putting stroke", skill_category: "Putting", video_url: "", thumbnail_url: null, sport: "Golf", created_at: "2026-03-16T09:00:00Z" },
  { id: "lv-025", athlete_id: "david-park", title: "Driver swing path — eliminating the slice", skill_category: "Driver", video_url: "", thumbnail_url: null, sport: "Golf", created_at: "2026-03-14T14:00:00Z" },

  // Jaylen Brooks - WR Route Running
  { id: "lv-026", athlete_id: "jaylen-brooks", title: "Setting up your stem to create separation on comebacks", skill_category: "Route Running", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-22T10:00:00Z" },
  { id: "lv-027", athlete_id: "jaylen-brooks", title: "How to sell a go route before breaking inside", skill_category: "Route Running", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-20T09:00:00Z" },
  { id: "lv-028", athlete_id: "jaylen-brooks", title: "Leverage principles — inside vs outside release", skill_category: "Footwork", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-18T11:00:00Z" },

  // DeAndre Miles - WR Deep Ball
  { id: "lv-029", athlete_id: "deandre-miles", title: "Tracking the ball over your shoulder on deep routes", skill_category: "Route Running", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-21T10:00:00Z" },
  { id: "lv-030", athlete_id: "deandre-miles", title: "Body positioning and high-pointing contested catches", skill_category: "Catching", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-19T08:00:00Z" },

  // Chris Vaughn - Slot WR
  { id: "lv-031", athlete_id: "chris-vaughn", title: "Finding soft spots in Cover 2 zone as a slot", skill_category: "Route Running", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-22T08:00:00Z" },
  { id: "lv-032", athlete_id: "chris-vaughn", title: "YAC techniques — setting up defenders after the catch", skill_category: "Footwork", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-20T14:00:00Z" },

  // Terrence Hall - WR Release
  { id: "lv-033", athlete_id: "terrence-hall", title: "Hand combat drills for beating press at the line", skill_category: "Footwork", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-21T09:00:00Z" },
  { id: "lv-034", athlete_id: "terrence-hall", title: "Three release moves every receiver needs", skill_category: "Route Running", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-19T11:00:00Z" },

  // Caleb Whitfield - QB Pocket
  { id: "lv-035", athlete_id: "caleb-whitfield", title: "How to feel the rush and climb the pocket", skill_category: "Footwork", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-22T07:00:00Z" },
  { id: "lv-036", athlete_id: "caleb-whitfield", title: "Delivering accurate throws under pressure", skill_category: "Throwing", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-20T10:00:00Z" },

  // Darius Monroe - QB Off-Platform
  { id: "lv-037", athlete_id: "darius-monroe", title: "Arm slot adjustment when throwing on the run", skill_category: "Throwing", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-21T08:00:00Z" },
  { id: "lv-038", athlete_id: "darius-monroe", title: "When to extend the play vs throw it away", skill_category: "Film Study", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-19T13:00:00Z" },

  // Ryan Okafor - QB Timing
  { id: "lv-039", athlete_id: "ryan-okafor", title: "Throwing on time — anticipation vs reaction", skill_category: "Throwing", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-22T06:00:00Z" },
  { id: "lv-040", athlete_id: "ryan-okafor", title: "Quick game execution — 3-step drop fundamentals", skill_category: "Footwork", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-20T08:00:00Z" },

  // Malik Jefferson - DB Man Coverage
  { id: "lv-041", athlete_id: "malik-jefferson", title: "Press technique fundamentals — hand placement and jam", skill_category: "Footwork", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-22T09:00:00Z" },
  { id: "lv-042", athlete_id: "malik-jefferson", title: "Mirroring routes in man coverage without losing leverage", skill_category: "Film Study", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-20T12:00:00Z" },

  // Andre Sullivan - DB Zone
  { id: "lv-043", athlete_id: "andre-sullivan", title: "Reading the QB's eyes in Cover 3", skill_category: "Film Study", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-21T07:00:00Z" },
  { id: "lv-044", athlete_id: "andre-sullivan", title: "Breaking on the ball — timing your drive", skill_category: "Footwork", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-19T10:00:00Z" },

  // Jalen Torres - DB Footwork
  { id: "lv-045", athlete_id: "jalen-torres", title: "Backpedal technique — staying balanced and explosive", skill_category: "Footwork", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-22T08:00:00Z" },
  { id: "lv-046", athlete_id: "jalen-torres", title: "Hip transition drills for faster change of direction", skill_category: "Footwork", video_url: "", thumbnail_url: null, sport: "Football", created_at: "2026-03-20T09:00:00Z" },
];
