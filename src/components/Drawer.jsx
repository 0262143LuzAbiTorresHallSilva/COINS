import React, { useState } from "react";
import Divider from "@mui/material/Divider";

export default function Drawer({ onOrdenar, limit, onChangeLimit }) {
  const [selected, setSelected] = useState("asc");

  const handleOrdenChange = (orden) => {
    setSelected(orden);
    onOrdenar(orden);
  };

  const handleLimitChange = (e) => {
    const value = e.target.value === "" ? null : Number(e.target.value);
    onChangeLimit(value); // 🔹 esto actualiza Home automáticamente
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
        width: "220px",
        background: "#f8f8f8",
        padding: "16px",
        boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Ordenar por</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          onClick={() => handleOrdenChange("asc")}
          style={{
            padding: "6px",
            borderRadius: "8px",
            background: selected === "asc" ? "#1976d2" : "#e0e0e0",
            color: selected === "asc" ? "white" : "black",
            border: "none",
          }}
        >
          Ascendente
        </button>
        <button
          onClick={() => handleOrdenChange("desc")}
          style={{
            padding: "6px",
            borderRadius: "8px",
            background: selected === "desc" ? "#1976d2" : "#e0e0e0",
            color: selected === "desc" ? "white" : "black",
            border: "none",
          }}
        >
          Descendente
        </button>
      </div>

      <Divider sx={{ marginY: 2 }} />

      <p style={{ fontSize: "0.9rem", marginTop: "12px" }}>Limit to:</p>
      <input
        type="number"
        value={limit ?? ""}
        onChange={handleLimitChange}
        placeholder="All"
        style={{
          width: "100%",
          padding: "6px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginTop: "4px",
        }}
      />
    </div>
  );
}
