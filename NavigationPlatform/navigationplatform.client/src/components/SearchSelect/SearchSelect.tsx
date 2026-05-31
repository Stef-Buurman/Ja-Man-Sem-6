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
    <div
      className="relative w-full max-w-[420px] overflow-visible"
      ref={containerRef}
    >
      <label htmlFor="string-search" className="block mb-[6px] text-[16px] font-semibold text-[#000000] text-left">
        {title}
      </label>

      <input
        id="string-search"
        type="text"
        className="w-full rounded-full bg-white px-3 font-semibold text-sm py-2 text-base text-[#000000] transition-all duration-200 focus:border-[#d3114c] focus:outline-none focus:ring-2 focus:ring-[#d3114c]/15"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="WN.02.007"
        disabled={disabled}
      />

      {isOpen && query.trim() !== "" && (
        <div className="absolute top-[calc(100%-2px)] left-3 right-3 mt-[6px] z-[9999]">
          {suggestions.length > 0 ? (
            <ul className="list-none m-0 p-0 border border-[#342626] rounded-lg overflow-hidden bg-white shadow-lg max-h-[220px] overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li key={`${suggestion.value}-${index}`}>
                  <button type="button" className="w-full flex items-center justify-between px-3 py-[9px] text-left bg-transparent border-0 border-b border-[#34262626] cursor-pointer transition-all duration-200 hover:bg-[#d3114c]/10 active:scale-[0.995]" onClick={() => handleSelect(suggestion.value)}>
                    <span className="text-sm font-medium text-[#342626]">{suggestion.value}</span>
                    <span className="min-w-6 px-[7px] py-[3px] rounded-full bg-[#d3114c] text-[#fdf1e3] text-xs font-bold text-center">{suggestion.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-[10px] border border-[#d3114c] rounded-lg bg-white text-[#342626] text-sm text-center ">Geen locaties met deze naam gevonden.</div>
          )}
        </div>
      )}
    </div>
  );
}
