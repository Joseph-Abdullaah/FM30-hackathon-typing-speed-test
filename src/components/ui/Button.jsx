import React from "react";

const variantClasses = {
  primary:
    "bg-blue-600 text-neutral-0 hover:bg-blue-400 cursor-pointer active:bg-blue-400 focus:ring-blue-400 focus:ring-offset-neutral-900",
  secondary:
    "bg-neutral-0 text-neutral-900 hover:bg-neutral-200 cursor-pointer active:bg-neutral-200 focus:ring-neutral-400 focus:ring-offset-neutral-900",
  ghost:
    "bg-neutral-800 text-neutral-0 hover:bg-neutral-800 cursor-pointer active:bg-neutral-700 focus:ring-neutral-400",
  outline:
    "bg-transparent text-neutral-0 border border-neutral-500 hover:border-blue-400 hover:text-blue-400 cursor-pointer active:bg-neutral-700 focus:ring-blue-400 focus:ring-offset-neutral-900",
};

const sizeClasses = {
  sm: "px-[10px] py-1.5 text-present-5 rounded-lg",
  md: "px-4 py-2.5 text-preset-3-semibold rounded-xl",
  lg: "px-6 py-4 text-preset-3-semibold rounded-xl",
};

function Button({
  variant = "primary",
  size = "medium",
  className = "",
  children,
  ...props
}) {
  const variantClass = variantClasses[variant] || variantClasses.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.medium;
  const baseClasses =
    "inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
