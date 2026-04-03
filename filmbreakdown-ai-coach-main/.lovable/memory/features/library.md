Library/Learn feature: elite athletes upload training videos, youth athletes browse athlete-specific libraries.
- Routes: /learn (discover), /learn/:athleteId (athlete library), /portal/library (My Library management)
- DB: library_videos table (athlete_id, title, skill_category, video_url, thumbnail_url, sport)
- Storage: library-videos bucket (public)
- Skill categories are sport-specific (src/data/skillCategories.ts)
- No auth yet — uses mock athlete identity from portalMockData
- No playlists, comments, likes, monetization, or social features
