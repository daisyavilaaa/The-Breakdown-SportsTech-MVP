interface GeometricBackgroundProps {
  position?: "top" | "bottom" | "both";
  opacity?: number;
  className?: string;
}

export function GeometricBackground({
  position = "bottom",
  opacity = 0.1,
  className = "",
}: GeometricBackgroundProps) {
  const fadeClass =
    position === "top"
      ? "geo-fade-down"
      : position === "bottom"
      ? "geo-fade-up"
      : "";

  return (
    <div
      className={`absolute inset-x-0 pointer-events-none overflow-hidden ${
        position === "top" ? "top-0" : position === "bottom" ? "bottom-0" : "inset-y-0"
      } ${fadeClass} ${className}`}
      style={{ opacity, height: position === "both" ? "100%" : "60%" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Row 1 */}
        <polygon points="0,0 200,0 100,120" fill="#1e293b" opacity="0.5" />
        <polygon points="200,0 400,0 300,120" fill="#1a2540" opacity="0.4" />
        <polygon points="400,0 600,0 500,120" fill="#172038" opacity="0.6" />
        <polygon points="600,0 800,0 700,120" fill="#1e293b" opacity="0.35" />
        <polygon points="800,0 1000,0 900,120" fill="#1a2540" opacity="0.5" />
        <polygon points="1000,0 1200,0 1100,120" fill="#172038" opacity="0.45" />

        {/* Row 2 */}
        <polygon points="0,0 100,120 0,120" fill="#172038" opacity="0.55" />
        <polygon points="100,120 200,0 300,120" fill="#1e293b" opacity="0.4" />
        <polygon points="300,120 400,0 500,120" fill="#1a2540" opacity="0.5" />
        <polygon points="500,120 600,0 700,120" fill="#172038" opacity="0.55" />
        <polygon points="700,120 800,0 900,120" fill="#1e293b" opacity="0.4" />
        <polygon points="900,120 1000,0 1100,120" fill="#1a2540" opacity="0.5" />
        <polygon points="1100,120 1200,0 1200,120" fill="#172038" opacity="0.45" />

        {/* Row 3 */}
        <polygon points="0,120 200,120 100,240" fill="#1e293b" opacity="0.35" />
        <polygon points="200,120 400,120 300,240" fill="#172038" opacity="0.55" />
        <polygon points="400,120 600,120 500,240" fill="#1a2540" opacity="0.45" />
        <polygon points="600,120 800,120 700,240" fill="#1e293b" opacity="0.3" />
        <polygon points="800,120 1000,120 900,240" fill="#172038" opacity="0.6" />
        <polygon points="1000,120 1200,120 1100,240" fill="#1a2540" opacity="0.45" />

        {/* Row 4 */}
        <polygon points="0,120 100,240 0,240" fill="#1a2540" opacity="0.4" />
        <polygon points="100,240 200,120 300,240" fill="#1e293b" opacity="0.5" />
        <polygon points="300,240 400,120 500,240" fill="#172038" opacity="0.6" />
        <polygon points="500,240 600,120 700,240" fill="#1a2540" opacity="0.35" />
        <polygon points="700,240 800,120 900,240" fill="#1e293b" opacity="0.45" />
        <polygon points="900,240 1000,120 1100,240" fill="#172038" opacity="0.55" />
        <polygon points="1100,240 1200,120 1200,240" fill="#1a2540" opacity="0.4" />

        {/* Row 5 */}
        <polygon points="0,240 200,240 100,360" fill="#1a2540" opacity="0.45" />
        <polygon points="200,240 400,240 300,360" fill="#172038" opacity="0.55" />
        <polygon points="400,240 600,240 500,360" fill="#1e293b" opacity="0.35" />
        <polygon points="600,240 800,240 700,360" fill="#1a2540" opacity="0.5" />
        <polygon points="800,240 1000,240 900,360" fill="#172038" opacity="0.6" />
        <polygon points="1000,240 1200,240 1100,360" fill="#1e293b" opacity="0.3" />

        {/* Row 6 */}
        <polygon points="0,240 100,360 0,360" fill="#1e293b" opacity="0.5" />
        <polygon points="100,360 200,240 300,360" fill="#1a2540" opacity="0.45" />
        <polygon points="300,360 400,240 500,360" fill="#172038" opacity="0.5" />
        <polygon points="500,360 600,240 700,360" fill="#1e293b" opacity="0.45" />
        <polygon points="700,360 800,240 900,360" fill="#1a2540" opacity="0.4" />
        <polygon points="900,360 1000,240 1100,360" fill="#172038" opacity="0.6" />
        <polygon points="1100,360 1200,240 1200,360" fill="#1a2540" opacity="0.45" />

        {/* Row 7 */}
        <polygon points="0,360 200,360 100,480" fill="#1a2540" opacity="0.35" />
        <polygon points="200,360 400,360 300,480" fill="#1e293b" opacity="0.5" />
        <polygon points="400,360 600,360 500,480" fill="#172038" opacity="0.55" />
        <polygon points="600,360 800,360 700,480" fill="#1a2540" opacity="0.4" />
        <polygon points="800,360 1000,360 900,480" fill="#1e293b" opacity="0.3" />
        <polygon points="1000,360 1200,360 1100,480" fill="#172038" opacity="0.6" />

        {/* Row 8 */}
        <polygon points="0,360 100,480 0,480" fill="#1e293b" opacity="0.45" />
        <polygon points="100,480 200,360 300,480" fill="#1a2540" opacity="0.4" />
        <polygon points="300,480 400,360 500,480" fill="#172038" opacity="0.4" />
        <polygon points="500,480 600,360 700,480" fill="#1e293b" opacity="0.55" />
        <polygon points="700,480 800,360 900,480" fill="#1a2540" opacity="0.45" />
        <polygon points="900,480 1000,360 1100,480" fill="#172038" opacity="0.35" />
        <polygon points="1100,480 1200,360 1200,480" fill="#1e293b" opacity="0.55" />

        {/* Row 9 */}
        <polygon points="0,480 200,480 100,600" fill="#172038" opacity="0.6" />
        <polygon points="200,480 400,480 300,600" fill="#1a2540" opacity="0.45" />
        <polygon points="400,480 600,480 500,600" fill="#1e293b" opacity="0.5" />
        <polygon points="600,480 800,480 700,600" fill="#172038" opacity="0.55" />
        <polygon points="800,480 1000,480 900,600" fill="#1a2540" opacity="0.4" />
        <polygon points="1000,480 1200,480 1100,600" fill="#1e293b" opacity="0.45" />

        {/* Row 10 */}
        <polygon points="0,480 100,600 0,600" fill="#1e293b" opacity="0.4" />
        <polygon points="100,600 200,480 300,600" fill="#172038" opacity="0.6" />
        <polygon points="300,600 400,480 500,600" fill="#1a2540" opacity="0.35" />
        <polygon points="500,600 600,480 700,600" fill="#1e293b" opacity="0.5" />
        <polygon points="700,600 800,480 900,600" fill="#172038" opacity="0.5" />
        <polygon points="900,600 1000,480 1100,600" fill="#1a2540" opacity="0.4" />
        <polygon points="1100,600 1200,480 1200,600" fill="#1e293b" opacity="0.5" />
      </svg>
    </div>
  );
}
