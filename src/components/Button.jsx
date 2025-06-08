const Button = ({ children, onClick, variant = "default", disabled }) => {
  const base =
    "px-2 py-1 md:px-4 md:py-2 rounded font-normal md:font-medium transition-colors";
  const variants = {
    default:
      "bg-primary-500 text-white hover:bg-primary-400 border-primary-500",
    outline:
      "border-primary-400 text-primary-400 hover:text-white hover:bg-primary-400 dark:hover:bg-primary-400",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border-[1px] rounded-lg cursor-pointer ${base} ${
        variants[variant]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
