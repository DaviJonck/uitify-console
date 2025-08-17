import React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={`block w-full h-8 rounded-md px-2 text-black border-gray-300 shadow-sm  sm:text-sm ${className}`}
      ref={ref}
      {...props}
    />
  );
});

export default Input;
