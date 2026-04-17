import { useMemo, useState, useRef, useEffect } from "react";
import "./SearchSelect.css";
import { SearchSelectProps } from "./SearchSelect.props";

export default function SearchSelect({ title, data, onSelect }: SearchSelectProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // 👇 CLOSE WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const counts = new Map<string, number>();

    for (const item of data) {
      const normalizedItem = item.trim();
      const lower = normalizedItem.toLowerCase();

      if (lower.startsWith(trimmed) && lower !== trimmed) {
        counts.set(normalizedItem, (counts.get(normalizedItem) || 0) + 1);
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
            <div className="search-no-results">No matching strings found.</div>
          )}
        </div>
      )}
    </div>
  );
}
