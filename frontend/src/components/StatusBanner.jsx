import React from "react";

export default function StatusBanner({ text, type = "info" }) {
  if (!text) {
    return null;
  }
  return <p className={`status-banner ${type}`}>{text}</p>;
}
