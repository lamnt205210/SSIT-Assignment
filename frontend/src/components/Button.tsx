import React from "react";

interface ButtonProps {
  variant?: "text" | "contained" | "outlined";
  color?: "default" | "primary" | "secondary";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  color = "default",
  size = "medium",
  onClick,
  disabled = false,
  children,
}) => {
  let baseClasses =
    "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  // Variant classes
  const variantClasses = {
    text: "",
    contained: "shadow",
    outlined: "border",
  };

  // Color classes
  const colorClasses = {
    default: "text-gray-700 bg-gray-200 hover:bg-gray-300",
    primary: "text-white bg-blue-500 hover:bg-blue-700",
    secondary: "text-white bg-green-500 hover:bg-green-700",
  };

  // Size classes
  const sizeClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-lg",
  };

  // Combine classes
  baseClasses += ` ${variantClasses[variant]} ${colorClasses[color]} ${sizeClasses[size]}`;

  return (
    <button
      className={`${baseClasses} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
