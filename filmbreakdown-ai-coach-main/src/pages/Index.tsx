import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AthleteCard } from "@/components/AthleteCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { GeometricBackground } from "@/components/GeometricBackground";
import { athletes } from "@/data/mockData";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

const Index = () => {
  const [featuredAthletes, setFeaturedAthletes] = useState<Array<{ id: string; name: string; sport: string; specialty: string; image: string; rating?: number; reviewCount?: number }>>(athletes.slice(0, 8));

  useEffect(() => {
    const fetchChadHansen = async () => {
      const { data } = await supabase
        .from("elite_profiles")
        .select("*")
        .eq("id", "da3066ea-a8fb-44e1-8661-f03136e180d6")
        .single();
      if (data) {
        const chad = {
          id: data.id,
          name: data.full_name,
          sport: data.sport,
          specialty: data.public_title,
          image: data.profile_image_url || "/placeholder.svg",
          rating: 5.0,
          reviewCount: 0,
        };
        setFeaturedAthletes([chad, ...athletes.slice(0, 7)]);
      }
    };
    fetchChadHansen();
  }, []);

  return (
    <div className="min-h-screen gradient-page">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden py-0" style={{ paddingTop: 160, paddingBottom: 160 }}>
        <GeometricBackground position="bottom" opacity={0.1} />
        <div className="container-page text-center relative z-10 px-0 py-[68px]">
          <motion.h1
            className="font-extrabold tracking-tight leading-[0.95] max-w-4xl mx-auto"
            style={{ fontSize: 'clamp(48px, 6vw, 72px)', color: '#F5F7FA' }}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
          >
            Clarity Creates Separation.
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto leading-relaxed font-extrabold text-2xl my-[14px] px-0 py-0"
            style={{ marginTop: 24, fontSize: 20, color: '#A1A1AA' }}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            Elite insight. Real development.
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-3"
            style={{ marginTop: 40 }}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
          >
            <Link to="/athletes">
              <Button size="lg" className="text-base font-bold gap-2 px-10 py-6 text-lg">
                Find Your Film Room
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container-page">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl tracking-tight text-foreground md:text-5xl font-extrabold mx-0 my-px px-0 py-[13px]">How It Works</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Enter a Film Room", desc: "Select the athlete you want feedback from." },
              { step: "02", title: "Upload Your Film", desc: "Submit your clip and explain what you need help with." },
              { step: "03", title: "Get Your Breakdown", desc: "Receive your personalized video analysis." },
            ].map((item) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-primary text-5xl tracking-tight font-bold my-0 px-0">{item.step}</span>
                <h3 className="text-lg mt-4 mb-2 text-foreground font-extrabold">{item.title}</h3>
                <p className="text-sm leading-relaxed max-w-xs mx-auto text-muted-foreground font-semibold">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Athletes */}
      <section id="athletes" className="py-20">
        <div className="container-page">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: '#F5F7FA' }}>Featured Athletes</h2>
            <p className="mt-3 max-w-xl mx-auto font-medium text-lg" style={{ color: '#A1A1AA' }}>
              Elite athletes ready to break down your film.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredAthletes.map((athlete) => (
              <AthleteCard key={athlete.id} {...athlete} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/athletes" className="transition-colors duration-150 hover:text-foreground text-base font-bold" style={{ color: '#A1A1AA' }}>
              View All Athletes →
            </Link>
          </div>
        </div>
      </section>

      {/* Example Breakdowns */}
      <section className="py-20">
        <div className="container-page">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: '#F5F7FA' }}>Example Breakdowns</h2>
            <p className="mt-3 font-medium text-lg" style={{ color: '#A1A1AA' }}>See what a professional film-room session looks like.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Breaking Down Catch-and-Shoot Mechanics", athlete: "Jordan Smith", sport: "Basketball" },
              { title: "Reading Cover 3 vs Cover 4", athlete: "Marcus Chen", sport: "Football" },
              { title: "First Touch Under Pressure Analysis", athlete: "Maya Rodriguez", sport: "Soccer" },
            ].map((example) => (
              <div key={example.title} className="group cursor-pointer">
                <VideoPlayer className="mb-4 rounded-lg" />
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors duration-150" style={{ color: '#F5F7FA' }}>{example.title}</h3>
                <p className="text-xs mt-1 font-light" style={{ color: '#A1A1AA' }}>{example.athlete} — {example.sport}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <GeometricBackground position="top" opacity={0.08} />
        <div className="container-page text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight" style={{ color: '#F5F7FA' }}>
            Ready to see<br />the difference?
          </h2>
          <p className="mt-4 text-base font-semibold" style={{ color: '#A1A1AA' }}>Get a professional breakdown from an elite athlete today.</p>
          <div className="mt-8">
            <Link to="/athletes">
              <Button size="lg" className="text-base font-bold gap-2 px-10 py-6 text-lg">
                Find Your Film Room
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
