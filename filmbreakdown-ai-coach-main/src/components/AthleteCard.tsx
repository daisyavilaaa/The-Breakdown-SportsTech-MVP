import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Film } from "lucide-react";

interface AthleteCardProps {
  id: string;
  name: string;
  sport: string;
  specialty: string;
  image: string;
  rating?: number;
  reviewCount?: number;
}

export function AthleteCard({ id, name, sport, specialty, image, rating = 4.9, reviewCount }: AthleteCardProps) {
  return (
    <Link to={`/athletes/${id}`}>
      <motion.div
        className="group relative aspect-[4/5] rounded-[14px] overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.15 }}
      >
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {reviewCount !== undefined && (
            <div className="flex items-center gap-1 mb-2">
              <Film className="h-3 w-3 text-foreground/50" />
              <span className="text-xs text-foreground/50">{reviewCount} reviews</span>
            </div>
          )}
          <h3 className="text-lg font-semibold text-white leading-tight">{name}</h3>
          <p className="text-sm text-white/70 mt-0.5">{sport}</p>
          <p className="text-xs text-white/50 mt-1">{specialty}</p>
        </div>
      </motion.div>
    </Link>
  );
}
