import { useMemo, useState, useRef, useEffect } from "react";
import "./SearchSelect.css";
import type { SearchSelectProps } from "./SearchSelect.props";

export default function SearchSelect({ title, data, onSelect, value, disabled }: SearchSelectProps) {
  const [query, setQuery] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value !== undefined) {
      setQuery(value);
    }
  }, [value]);

  const normalizeRoom = (value: string) => value.toLowerCase().replace(/\./g, "");

  const suggestions = useMemo(() => {
    const trimmed = normalizeRoom(query);
    if (!trimmed) return [];

    const counts = new Map<string, number>();

    for (const item of data) {
      const normalizedItemRaw = item.trim();
      const normalizedItem = normalizeRoom(normalizedItemRaw);

      if ((normalizedItem.includes(trimmed) && normalizedItem !== trimmed) || normalizedItem === trimmed) {
        counts.set(normalizedItemRaw, (counts.get(normalizedItemRaw) || 0) + 1);
      }
    }

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([value, count]) => ({ value, count }));
  }, [query, data]);

  const handleSelect = (value: string) => {
    setQuery(value);
    setIsOpen(false);
    onSelect?.(value);
  };

  return (
    <div className="search-box-container" ref={containerRef}>
      <label htmlFor="string-search" className="search-box-label">
        {title}
      </label>

      <input
        id="string-search"
        type="text"
        className="search-box-input"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Type something..."
        disabled={disabled}
      />

      {isOpen && query.trim() !== "" && (
        <div className="search-results-wrapper">
          {suggestions.length > 0 ? (
            <ul className="search-results-list">
              {suggestions.map((suggestion, index) => (
                <li key={`${suggestion.value}-${index}`}>
                  <button type="button" className="search-result-button" onClick={() => handleSelect(suggestion.value)}>
                    <span className="search-result-text">{suggestion.value}</span>
                    <span className="search-result-count">{suggestion.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="search-no-results">Geen locaties met deze naam gevonden.</div>
          )}
        </div>
      )}
    </div>
  );
}
