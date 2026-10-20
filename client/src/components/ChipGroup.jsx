// Pill selector. Colours follow the global theme.
const ChipGroup = ({ options, value, onChange }) => (
  <div className="mt-3 flex gap-3 flex-wrap">
    {options.map((option) => (
      <button
        type="button"
        key={option}
        onClick={() => onChange(option)}
        className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition ${
          value === option
            ? "bg-primary/10 text-primary border-primary/40"
            : "text-gray-500 border-gray-300 hover:border-primary/40"
        }`}
      >
        {option}
      </button>
    ))}
  </div>
);

export default ChipGroup;
