import React from "react";

import "./styles.scss";

function Field({ label, id, children, error = false }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="field__error">{error}</span>}
    </div>
  )
}

export default Field;