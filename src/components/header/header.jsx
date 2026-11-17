import { useEffect, useRef, useState } from 'react';
import './header.css';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projetos' },
  { href: '#skills', label: 'Skills' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#info', label: 'Informações' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handlePointer = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', handlePointer);
    return () => document.removeEventListener('pointerdown', handlePointer);
  }, [menuOpen]);

  return (
    <header className="header" ref={headerRef} onKeyDown={(event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    }} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
    }}>
      <a className="header-brand" href="#home" onClick={() => setMenuOpen(false)}>Michael Soares</a>
      <button ref={buttonRef} type="button" className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen((previous) => !previous)}
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuOpen} aria-controls="mobile-navigation">
        <span /><span /><span />
      </button>
      <nav className="nav" aria-label="Navegação principal">
        {links.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <nav id="mobile-navigation" className={`nav-overlay ${menuOpen ? 'open' : ''}`} aria-label="Navegação móvel" inert={!menuOpen}>
        {links.map(({ href, label }) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
    </header>
  );
}
