import React, { cloneElement, Children, useRef } from "react";
import { Icon } from "./components";
import clsx from "clsx";

function Header() {
  return (
    <header className="flex justify-center">
      <h1 className="w-20 mt-16 mb-8">
        <Icon.Logo />
      </h1>
    </header>
  );
}

function Card({ children, className }) {
  return <div className={clsx("p-6 shadow w-full", className)}>{children}</div>;
}

function TextField({ id, label, icon }) {
  return (
    <div>
      <label className="text-text-dark text-sm font-bold pb-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          className="w-full p-2 bg-lightest text-right font-bold text-darkest"
          id={id}
          type="number"
        />
        {icon && cloneElement(icon, { className: "h-4 w-4 absolute m-4" })}
      </div>
    </div>
  );
}

function RadioGroup({ name, label, children }) {
  return (
    <fieldset>
      <legend className="text-text-dark text-sm font-bold pb-2">{label}</legend>
      <div className="grid grid-cols-2 gap-4">
        {Children.map(children, (child) => cloneElement(child, { name: name }))}
      </div>
    </fieldset>
  );
}

function Radio({ value, label, name, custom }) {
  const ref = useRef(null);
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
              ref={ref}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function DataField({ title, note, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <strong className="text-white text-lg">{title}</strong>
        <span className="text-label text-sm">{note}</span>
      </div>
      <p className="text-light text-3xl font-bold">{value}</p>
    </div>
  );
}

function App() {
  return (
    <main className="">
      <Header />
      <main>
        <Card className="bg-white rounded-3xl">
          <form className="flex flex-col gap-4">
            <TextField id="bill" label="Bill" icon={<Icon.Dollar />} />

            <RadioGroup name="tips" label="Select Tip %">
              <Radio value="5" label="5%" />
              <Radio value="10" label="10%" />
              <Radio value="15" label="15%" />
              <Radio value="25" label="25%" />
              <Radio value="50" label="50%" />
              <Radio value="custom" label="Custom" custom />
            </RadioGroup>

            <TextField
              id="people"
              label="Number of People"
              icon={<Icon.Person />}
            />

            <Card className="bg-darkest rounded-xl space-y-6">
              <div className="space-y-4">
                <DataField title="Tip Amount" note="/ persion" value="$4.27" />
                <DataField title="Total" note="/ persion" value="$32.79" />
              </div>

              <button
                type="reset"
                className="bg-light w-full h-12 text-xl font-bold text-darkest rounded-md"
              >
                RESET
              </button>
            </Card>
          </form>
        </Card>
      </main>
    </main>
  );
}

export default App;
