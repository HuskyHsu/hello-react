import React, { cloneElement, useRef, Children, useState } from "react";
import clsx from "clsx";

export function Radio({ value, label, name, custom, checked }) {
  const ref = useRef(null);

  const [customValue, setCustomValue] = useState(0);

  function onFocus() {
    ref.current?.focus();
  }
  return (
    <div>
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        className="sr-only peer"
        onChange={custom && onFocus}
        defaultChecked={checked}
      />
      <label
        htmlFor={value}
        className={clsx(
          "block py-4 w-full rounded-md",
          "text-center text-xl font-bold",
          custom ? "bg-lightest text-text-light" : "bg-darkest text-white",
          custom
            ? "peer-checked:hidden"
            : "peer-checked:bg-light peer-checked:text-darkest"
        )}
      >
        {label}
      </label>

      {custom && (
        <div className="peer-checked:flex rounded-md hidden">
          <div className="flex items-center">
            <input
              className="w-full p-4 bg-lightest text-right text-xl font-bold text-darkest"
              type="number"
              name="custom"
              ref={ref}
              value={customValue}
              onChange={(event) => setCustomValue(Number(event.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function RadioGroup({ name, label, children }) {
  return (
    <fieldset>
      <legend className="text-text-dark text-sm font-bold pb-2">{label}</legend>
      <div className="grid grid-cols-2 gap-4">
        {Children.map(children, (child) => cloneElement(child, { name: name }))}
      </div>
    </fieldset>
  );
}
