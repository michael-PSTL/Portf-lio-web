import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "motion/react";
import "./AnimatedList.css";

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      style={{ marginBottom: "1rem", cursor: "pointer" }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedList = ({
  items = [],
  onItemSelect,
  onClose,
  showGradients = true,
  enableArrowNavigation = true,
  className = "",
  itemClassName = "",
  displayScrollbar = true,
  initialSelectedIndex = -1,
}) => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const handleItemMouseEnter = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const handleItemClick = useCallback(
    (item, index) => {
      setSelectedIndex(index);
      if (onItemSelect) onItemSelect(item, index);
    },
    [onItemSelect]
  );

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  }, []);

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) onItemSelect(items[selectedIndex], selectedIndex);
        }
      } else if (e.key === "Escape") {
        if (onClose) onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation, onClose]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: "smooth" });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({ top: itemBottom - containerHeight + extraMargin, behavior: "smooth" });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className={`scroll-list-container ${className}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {onClose && (
          <button className="close-button" onClick={onClose} aria-label="Fechar lista">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        <div style={{ position: "relative" }}>
          <div
            ref={listRef}
            className={`scroll-list ${!displayScrollbar ? "no-scrollbar" : ""}`}
            onScroll={handleScroll}
          >
            {items.map((item, index) => (
              <AnimatedItem
                key={index}
                delay={0.1}
                index={index}
                onMouseEnter={() => handleItemMouseEnter(index)}
                onClick={() => handleItemClick(item, index)}
              >
                <a
                  href={item.link ?? "#"}
                  target={item.link && item.link !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`item ${selectedIndex === index ? "selected" : ""} ${itemClassName}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.num && <span className="item-num">{item.num}</span>}

                  <div className="item-info">
                    <p className="item-title">{item.title ?? item}</p>
                    {item.desc && <p className="item-text">{item.desc}</p>}
                  </div>

                  {item.tag && (
                    <span className="item-tag">
                      <svg viewBox="0 0 20 20" width="30" height="30">
                        <use href={`/#${item.tag}`} />
                      </svg>
                    </span>
                  )}
                </a>
              </AnimatedItem>
            ))}
          </div>

          {showGradients && (
            <>
              <div className="top-gradient" style={{ opacity: topGradientOpacity }} />
              <div className="bottom-gradient" style={{ opacity: bottomGradientOpacity }} />
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default AnimatedList;