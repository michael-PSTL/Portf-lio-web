import { useEffect, useId, useRef } from 'react';
import './AnimatedList.css';

export default function AnimatedList({ items = [], onClose }) {
  const dialogRef = useRef(null);
  const headingId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  const handleArrowKeys = (event) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const links = Array.from(dialogRef.current.querySelectorAll('.item[href]'));
    if (links.length === 0) return;
    event.preventDefault();
    const index = links.indexOf(document.activeElement);
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1
      : event.key === 'ArrowDown' ? Math.min(index + 1, links.length - 1) : Math.max(index - 1, 0);
    links[nextIndex].focus();
    links[nextIndex].scrollIntoView({ block: 'nearest' });
  };

  return (
    <dialog
      ref={dialogRef}
      className="scroll-list-container"
      aria-labelledby={headingId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
      onKeyDown={handleArrowKeys}
    >
      <div className="modal-content">
        <h2 className="modal-heading" id={headingId}>Todos os projetos</h2>
        <button type="button" className="close-button" onClick={onClose} aria-label="Fechar lista" autoFocus>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="m18 6-12 12M6 6l12 12" />
          </svg>
        </button>
        <ul className="scroll-list">
          {items.map((item) => {
            const content = <>
              {item.num && <span className="item-num">{item.num}</span>}
              <div className="item-info"><p className="item-title">{item.title}</p>{item.desc && <p className="item-text">{item.desc}</p>}</div>
              {item.tag && <span className="item-tag" aria-hidden="true"><svg viewBox="0 0 20 20" width="30" height="30"><use href={`#${item.tag}`} /></svg></span>}
            </>;
            return <li key={item.id}>
              {item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer" className="item">{content}</a> : <div className="item">{content}</div>}
            </li>;
          })}
        </ul>
      </div>
    </dialog>
  );
}
