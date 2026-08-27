"use client";

import { useState } from "react";

type MobileNavProps = {
  navItems: Array<[string, string]>;
};

export default function MobileNav({ navItems }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`mobile-nav ${open ? "open" : ""}`}>
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <span></span><span></span><span></span>
      </button>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <button
            className="button"
            type="button"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new CustomEvent("keywrd:open-contact", { detail: { reason: "Free Performance Audit" } }));
            }}
          >
            Get a Free Performance Audit <span aria-hidden="true">↗</span>
          </button>
        </nav>
      )}
    </div>
  );
}
