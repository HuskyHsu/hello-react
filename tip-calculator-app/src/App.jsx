import React, { useState, cloneElement } from "react";
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
      <label className="text-text-dark text-sm font-bold" htmlFor={id}>
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
