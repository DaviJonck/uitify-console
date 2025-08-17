import React from "react";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <select
      className={`block w-full rounded-md border-gray-300 shadow-sm text-black sm:text-sm cursor-pointer ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

export default Select;
