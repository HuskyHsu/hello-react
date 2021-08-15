import React, { cloneElement } from "react";

export function TextField({ id, label, icon, value, min }) {
  return (
    <div>
      <label className="text-text-dark text-sm font-bold pb-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          className="w-full p-2 bg-lightest text-right font-bold text-darkest"
          id={id}
          name={id}
          type="number"
          defaultValue={value}
          min={min}
        />
        {icon && cloneElement(icon, { className: "h-4 w-4 absolute m-4" })}
      </div>
    </div>
  );
}
