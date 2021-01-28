import React from "react";

import "./styles.css";

function Button({ type, children }) {
  return <button type={type} className="button">{children}</button>
}

export default Button;