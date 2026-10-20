// GINI logo: four-petal mark + wordmark. No image file needed.
const Logo = ({ className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 ${onClick ? "cursor-pointer" : ""} ${className}`}
  >
    <svg viewBox="0 0 32 32" className="w-8 h-8" aria-hidden="true">
      <defs>
        <linearGradient id="gini-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d85fa5" />
        </linearGradient>
      </defs>
      <g fill="url(#gini-g)">
        <circle cx="11" cy="11" r="6" />
        <circle cx="21" cy="11" r="4.5" opacity="0.85" />
        <circle cx="11" cy="21" r="4.5" opacity="0.85" />
        <circle cx="21" cy="21" r="6" />
      </g>
    </svg>
    <span className="text-2xl font-semibold tracking-tight text-ink">GINI</span>
  </div>
);

export default Logo;
