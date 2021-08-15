import React, { useState } from "react";
import {
  Icon,
  Radio,
  RadioGroup,
  Card,
  TextField,
  DataField,
} from "./components";

function App() {
  const [{ tipAmount, total }, setForm] = useState({
    tipAmount: 0,
    total: 0,
  });

  function onChange(target) {
    const form = Object.fromEntries(new FormData(target).entries());

    const data = {
      bill: Number(form.bill),
      tips: form.tips === "custom" ? form.tips : Number(form.tips),
      person: Number(form.people),
      custom: Number(form.custom),
    };

    let tip =
      data.bill *
      (data.tips === "custom" ? data.custom / 100 : data.tips / 100);

    const tipAmount = tip / data.person;
    const total = (data.bill + tip) / data.person;

    setForm({
      tipAmount: Math.round(tipAmount, 2),
      total: Math.round(total, 2),
    });
  }

  return (
    <div className="">
      <header className="flex justify-center">
        <h1 className="w-20 mt-16 mb-8">
          <Icon.Logo />
        </h1>
      </header>

      <main>
        <Card className="bg-white rounded-3xl">
          <form
            className="flex flex-col gap-4"
            onChangeCapture={(event) => onChange(event.currentTarget)}
            onReset={(event) =>
              requestAnimationFrame(() => onChange(event.target))
            }
          >
            <TextField
              id="bill"
              label="Bill"
              icon={<Icon.Dollar />}
              value="0"
              min="0"
            />

            <RadioGroup name="tips" label="Select Tip %">
              <Radio value="5" label="5%" checked />
              <Radio value="10" label="10%" />
              <Radio value="15" label="15%" />
              <Radio value="25" label="25%" />
              <Radio value="50" label="50%" />
              <Radio value="custom" label="Custom" custom />
            </RadioGroup>

            <TextField
              id="people"
              label="Number of People"
              value="1"
              min="1"
              icon={<Icon.Person />}
            />

            <Card className="bg-darkest rounded-xl space-y-6">
              <div className="space-y-4">
                <DataField
                  title="Tip Amount"
                  note="/ persion"
                  value={`$${tipAmount}`}
                />
                <DataField title="Total" note="/ persion" value={`$${total}`} />
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
    </div>
  );
}

export default App;
