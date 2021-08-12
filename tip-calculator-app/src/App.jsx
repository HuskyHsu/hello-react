import React, { cloneElement, Children } from "react";
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
        {cloneElement(icon, { className: "h-4 w-4 absolute m-4" })}
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

function Radio({ value, label, name }) {
  return (
    <div>
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        className="sr-only peer"
      />
      <label
        htmlFor={value}
        className={clsx(
          "block bg-darkest py-4 w-full rounded-md",
          "text-center text-white text-xl font-bold",
          "peer-checked:bg-light peer-checked:text-darkest"
        )}
      >
        {label}
      </label>
    </div>
  );
}

function App() {
  return (
    <main className="">
      {/* header */}
      <Header />
      <main>
        <Card className="bg-white rounded-3xl">
          <form>
            <TextField id="bill" label="Bill" icon={<Icon.Dollar />} />
          </form>
          {/* select tip */}
          <RadioGroup name="tips" label="Select Tip %">
            <Radio value="5" label="5%" />
            <Radio value="10" label="10%" />
            <Radio value="15" label="15%" />
            <Radio value="25" label="25%" />
            <Radio value="50" label="50%" />
            <Radio value="custom" label="Custom" />
          </RadioGroup>

          {/* number of people */}
          <TextField
            id="people"
            label="Number of People"
            icon={<Icon.Person />}
          />
          {/* result */}
        </Card>
      </main>
    </main>
  );
}

export default App;
