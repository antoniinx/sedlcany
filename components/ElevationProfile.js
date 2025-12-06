export default function ElevationProfile({ profile, totalLength }) {
  if (!profile || profile.length === 0) {
    return (
      <div className="w-full h-32 bg-dark-bg border border-dark-border rounded-xl flex items-center justify-center">
        <p className="text-gray-400 text-sm">Žádná data o výškovém profilu</p>
      </div>
    );
  }

  const maxElevation = Math.max(...profile.map(p => p.elevation));
  const minElevation = Math.min(...profile.map(p => p.elevation));
  const elevationRange = maxElevation - minElevation || 1;
  const maxDistance = totalLength || profile[profile.length - 1].distance;

  // Calculate points for SVG path
  const points = profile.map((point, index) => {
    const x = (point.distance / maxDistance) * 100;
    const y = 100 - ((point.elevation - minElevation) / elevationRange) * 80; // 80% of height for padding
    return `${x},${y}`;
  }).join(' ');

  // Create area path for fill
  const areaPath = `M 0,100 L ${points} L 100,100 Z`;

  return (
    <div className="w-full bg-dark-bg border border-dark-border rounded-xl p-4">
      <div className="relative w-full h-32">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#3a3a3a"
              strokeWidth="0.5"
            />
          ))}
          {/* Elevation area */}
          <path
            d={areaPath}
            fill="url(#elevationGradient)"
            opacity="0.3"
          />
          {/* Elevation line */}
          <polyline
            points={points}
            fill="none"
            stroke="#ff3b30"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="elevationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff3b30" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ff3b30" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
        {/* Elevation labels */}
        <div className="absolute top-2 left-2 text-xs font-semibold text-white">
          {maxElevation}m
        </div>
        <div className="absolute bottom-2 left-2 text-xs font-semibold text-gray-400">
          {minElevation}m
        </div>
        <div className="absolute bottom-2 right-2 text-xs font-semibold text-gray-400">
          {maxDistance.toFixed(1)} km
        </div>
      </div>
    </div>
  );
}

