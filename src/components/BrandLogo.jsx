import { Link } from "react-router-dom";

function BrandLogo({ to = "/", label = "Sapore Mediterraneo", compact = false, className = "" }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-3 ${className}`}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-terracotta/25 bg-cream font-serif text-lg font-bold text-terracotta shadow-sm shadow-stone/10">
        SM
      </span>
      {!compact ? (
        <span className="flex flex-col leading-tight">
          <span className="font-serif text-2xl font-bold text-terracotta md:text-3xl">Sapore</span>
          <span className="font-serif text-sm text-olive-dark md:text-base">Mediterraneo</span>
        </span>
      ) : (
        <span className="font-serif text-xl font-bold text-current">{label}</span>
      )}
    </Link>
  );
}

export default BrandLogo;
