import './SearchBar.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        className="search-bar__input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
      />
    </div>
  );
}
