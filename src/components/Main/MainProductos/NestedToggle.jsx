import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import "../../../styles/NestedToggle.css";

const NestedToggle = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(prev => !prev);

  return (
    <div className="nested-toggle">
      <div className="toggle-header" onClick={handleToggle} >
        <FaChevronRight
          className={`chevron-icon ${open ? "rotated" : ""}`}
        />
        <span className="toggle-title">{title}</span>
      </div>

      {open && <div className="toggle-children">{children}</div>}
    </div>
  );
};

export default NestedToggle;
