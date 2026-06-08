/*
 * Button.jsx
 * Reusable, styling-consistent button component for CodeMate Resources page.
 * Supports multiple variants (primary, secondary, outline, ghost, light) and sizes.
 */

const Button = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  icon = null,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-sans transition-all duration-300  disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-brand-primary text-black font-semibold hover:bg-brand-primary-dark shadow-lg shadow-brand-primary/10",
    secondary:
      "bg-zinc-800/80 text-zinc-100 font-semibold hover:bg-zinc-700 border border-zinc-700/50",
    outline:
      "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white",
    ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800/50",
    light: "bg-white text-zinc-950 font-semibold hover:bg-zinc-100 shadow-md",
  };

  const sizes = {
    sm: "text-xs px-4 py-1.5 rounded-full gap-1.5",
    md: "text-sm px-6 py-2 rounded-full gap-2",
    lg: "text-base px-8 py-3 rounded-full gap-2.5",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="flex items-center">{icon}</span>}
    </button>
  );
};

export default Button;
