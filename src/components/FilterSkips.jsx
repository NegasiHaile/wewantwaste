import { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowUpAZ, ArrowDownZA, Filter } from "lucide-react";

const filterFields = [
  { id: "size", label: "Skip Size (Yd)", type: "number" },
  { id: "size_gt", label: "Skip Size > (Yd)", type: "number" },
  { id: "allowed_on_road", label: "Allowed on Road", type: "boolean" },
  { id: "allows_heavy_waste", label: "Allows Heavy Waste", type: "boolean" },
  { id: "forbidden", label: "Forbidden", type: "boolean" },
  { id: "hire_period_days", label: "Hire Period (days)", type: "number" },
];

const sortFields = [
  { id: "price_before_vat", label: "Price" },
  { id: "size", label: "Size" },
  { id: "hire_period_days", label: "Hire Period" },
];

export default function FilterSkips({
  onFilterChange,
  skips,
  setFilteredSkips,
}) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let filtered = skips.filter((skip) =>
      Object.entries(filters).every(([key, value]) => {
        if (value === "" || value === undefined) return true;
        if (key === "size_gt") return skip["size"] > value;
        if (typeof value === "boolean") return skip[key] === true;
        return skip[key] === value;
      })
    );

    if (sortBy) {
      filtered = [...filtered].sort((a, b) =>
        sortOrder === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
      );
    }

    setFilteredSkips(filtered);
    onFilterChange?.(filters);
  }, [filters, sortBy, sortOrder, skips]);

  const handleBooleanToggle = (id) =>
    setFilters((prev) => {
      const updated = { ...prev };
      if (id in updated) delete updated[id];
      else updated[id] = true;
      return updated;
    });

  const handleValueChange = (id, value, type) =>
    setFilters((prev) => ({
      ...prev,
      [id]: type === "number" ? parseFloat(value) || "" : value,
    }));

  const renderFilterInput = ({ id, label, type }) => (
    <div key={id} className="flex justify-between items-center gap-3">
      <label className="flex-1 text-gray-700 dark:text-gray-200">{label}</label>
      {type === "boolean" ? (
        <input
          type="checkbox"
          checked={filters[id] === true}
          onChange={() => handleBooleanToggle(id)}
          className="w-4 h-4 accent-primary-500 cursor-pointer"
        />
      ) : (
        <input
          type={type}
          value={filters[id] || ""}
          onChange={(e) => handleValueChange(id, e.target.value, type)}
          className="w-28 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
        />
      )}
    </div>
  );

  return (
    <div className="w-full flex justify-between items-center gap-4">
      {/* SORT SECTION */}
      <div className="flex items-center gap-1 md:gap-3 bg-white dark:bg-gray-800 px-2 md:px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm">
        <label className="text-sm hidden md:block font-semibold text-gray-700 dark:text-gray-200">
          Sort by
        </label>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none text-sm pl-3 pr-8 py-1.5 cursor-pointer rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
          >
            <option value="">-- Select --</option>
            {sortFields.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
        </div>

        {sortBy && (
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="flex items-center gap-1 px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
          >
            {sortOrder === "asc" ? (
              <>
                <ArrowUpAZ className="w-4 h-4" />
                <span className="hidden sm:block">Asc</span>
              </>
            ) : (
              <>
                <ArrowDownZA className="w-4 h-4" />
                <span className="hidden sm:block">Desc</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* FILTER SECTION */}
      <div
        ref={dropdownRef}
        className="relative w-fit md:w-full max-w-64 text-left"
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <span className="flex items-center gap-2 truncate">
            <Filter className="w-4 h-4" />
            Filter Skips
          </span>
          <ChevronDown
            className={`h-4 w-4 ml-2 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute z-10 mt-2 min-w-[16rem] max-w-full right-0 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg p-4 space-y-3 text-sm">
            {filterFields.map(renderFilterInput)}
          </div>
        )}
      </div>
    </div>
  );
}
