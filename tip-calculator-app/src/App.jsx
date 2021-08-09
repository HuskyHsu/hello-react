import React, { useState } from "react";
import { Icon } from "./components";
import { ReactComponent as Dollar } from "./images/icon-dollar.svg";

function clsx(...className) {
  return className.filter(Boolean).join(" ");
}

function Header() {
  return (
    <header className="w-20 mt-16 mb-8">
      <Icon.Logo />
    </header>
  );
}

function Card({ children, className }) {
  return <div className={clsx("p-6 shadow w-full", className)}>{children}</div>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="h-full w-full flex flex-col items-center">
      {/* header */}
      <Header />

      <Card className="bg-white rounded-3xl">
        <form>
          <label className="text-text-dark text-sm" htmlFor="bill">
            Bill
          </label>
          <input
            className="w-full p-2 bg-lightest text-right font-bold text-darkest"
            id="bill"
            type="number"
            value="142.55"
            step="0.01"
          />
          <Dollar />
        </form>
        {/* select tip */}
        {/* number of people */}
        {/* result */}
      </Card>
    </main>
  );
}

export default App;
