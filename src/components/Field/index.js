import React from "react";

import "./styles.css";

function Field({ label, id, children }) {
  return (
    <div className="field">
      <label for={id}>{label}</label>
      {children}
    </div>
  )
}

export default Field;