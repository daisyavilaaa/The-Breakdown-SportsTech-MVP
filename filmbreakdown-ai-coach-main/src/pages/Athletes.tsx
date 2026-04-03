import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AthleteCard } from "@/components/AthleteCard";
import { GeometricBackground } from "@/components/GeometricBackground";
import { athletes as mockAthletes, sports as mockSports, type Athlete } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/BackButton";
import { supabase } from "@/integrations/supabase/client";

interface HybridAthlete extends Athlete {
  isMock: boolean;
}

const Athletes = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [realAthletes, setRealAthletes] = useState<HybridAthlete[]>([]);

  useEffect(() => {
    const fetchRealAthletes = async () => {
      const { data } = await supabase.from("elite_profiles").select("*");
      if (data) {
        const mapped: HybridAthlete[] = data.map((p) => ({
          id: p.id,
          name: p.full_name,
          sport: p.sport,
          specialty: p.public_title,
          image: p.profile_image_url || "/placeholder.svg",
          rating: 5.0,
          reviewCount: 0,
          bio: p.value_statement || "",
          achievements: [...(p.achievements || []), ...(p.custom_achievements || [])],
          expertise: [...(p.expertise || []), ...(p.custom_expertise || [])],
          submissionGuide: p.submission_preferences || [],
          recommendedClips: [...(p.clip_types || []), ...(p.custom_clip_types || [])],
          exampleQuestions: [...(p.example_questions || []), ...(p.custom_questions || [])],
          isMock: false,
        }));
        setRealAthletes(mapped);
      }
    };
    fetchRealAthletes();
  }, []);

  const allAthletes: HybridAthlete[] = useMemo(() => {
    const mocks: HybridAthlete[] = mockAthletes.map((a) => ({ ...a, isMock: true }));
    // Interleave real athletes among mock ones
    const combined = [...realAthletes, ...mocks];
    return combined;
  }, [realAthletes]);

  const allSports = useMemo(() => {
    const sportSet = new Set([...mockSports, ...realAthletes.map((a) => a.sport)]);
    return Array.from(sportSet);
  }, [realAthletes]);

  const filteredAthletes = useMemo(() => {
    return allAthletes.filter((a) => {
      const matchesSport = !selectedSport || a.sport === selectedSport;
      const matchesSearch =
        !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSport && matchesSearch;
    });
  }, [selectedSport, searchQuery, allAthletes]);

  return (
    <div className="min-h-screen gradient-page">
      <Navbar />
      <div className="relative">
        <GeometricBackground position="top" opacity={0.08} className="!h-48" />
      </div>
      <main className="container-page py-16">
        <BackButton />
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Athletes
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse elite athletes available for film breakdowns.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search athletes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSport(null)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150",
                !selectedSport
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={selectedSport ? { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' } : {}}
            >
              All
            </button>
            {allSports.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport === selectedSport ? null : sport)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150",
                  selectedSport === sport
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                style={selectedSport !== sport ? { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' } : {}}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        {filteredAthletes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm">No athletes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAthletes.map((athlete) => (
              <AthleteCard key={athlete.id} {...athlete} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Athletes;
