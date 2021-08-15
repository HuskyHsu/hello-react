import React from "react";

export function DataField({ title, note, value }) {
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
