import { useState, useEffect } from "react";
import "./header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trava o scroll do body quando menu aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projetos" },
    { href: "#skills", label: "Skills" },
    { href: "#timeline", label: "Timeline" },
    { href: "#info", label: "Informações" },
  ];

  return (
    <header className="header">
      {/* HAMBURGER — esquerda, visível só em mobile via CSS */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* NAV — desktop (centro) */}
      <nav className="nav">
        {links.map(({ href, label }) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>

      {/* NAV — mobile overlay */}
      <nav className={`nav-overlay ${menuOpen ? "open" : ""}`}>
        {links.map(({ href, label }) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>

      {/* ACTIONS — direita */}
      <div className="actions">
        <svg className="theme-icon" width="35" height="35">
          <use href="/#theme" />
        </svg>

        <span className="seasonal-flag" style={{ display: "none" }}>
          {/* <img src="/src/assets/icons/gorro-do-papai-noel.png" alt="Season Flag" width="40" height="40" /> */}
        </span>

        <svg className="config-icon" width="35" height="35">
          <use href="/#config" />
        </svg>
      </div>
    </header>
  );
}
