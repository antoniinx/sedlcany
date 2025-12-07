export default function ElevationProfile({ profile, color = "#ff3b30" }) {
  if (!profile || profile.length < 2) return null;

  const width = 100;
  const height = 40;
  const padding = 2; // Keep content away from very edges

  const minEle = Math.min(...profile.map(p => p.elevation));
  const maxEle = Math.max(...profile.map(p => p.elevation));
  const eleRange = maxEle - minEle || 1; // Prevent division by zero

  const maxDist = profile[profile.length - 1].distance;

  // Helper to map values to SVG coordinates
  // X: 0 -> width
  // Y: height -> 0 (because SVG Y is down)
  const getX = (dist) => (dist / maxDist) * (width - 2 * padding) + padding;
  const getY = (ele) => height - padding - ((ele - minEle) / eleRange) * (height - 2 * padding);

  // Build points for the line
  let d = `M ${getX(profile[0].distance)} ${getY(profile[0].elevation)}`;

  profile.forEach((p, i) => {
    if (i === 0) return;
    // Smoother curves could be done with bezier, but straight lines are fine for accurate sports data
    d += ` L ${getX(p.distance)} ${getY(p.elevation)}`;
  });

  // Build area (close the loop down to bottom)
  const areaD = `${d} L ${getX(maxDist)} ${height} L ${getX(0)} ${height} Z`;

  return (
    <div className="w-full h-24 relative">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
        {/* Gradient Definition */}
        <defs>
          <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.0 }} />
          </linearGradient>
        </defs>

        {/* Fill Area */}
        <path d={areaD} fill={`url(#grad-${color})`} stroke="none" />

        {/* Stroke Line */}
        <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Start/End Dots */}
        <circle cx={getX(0)} cy={getY(profile[0].elevation)} r="1.5" fill={color} />
        <circle cx={getX(maxDist)} cy={getY(profile[profile.length - 1].elevation)} r="1.5" fill={color} />

      </svg>

      {/* Labels */}
      <div className="absolute top-0 right-0 text-[10px] font-bold text-gray-400">{maxEle} m</div>
      <div className="absolute bottom-0 right-0 text-[10px] font-bold text-gray-400">{minEle} m</div>
    </div>
  );
}
