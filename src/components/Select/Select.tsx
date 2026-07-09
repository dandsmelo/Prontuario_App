import './style.css';

interface Option {
  label: string;
  value: string;
}

interface Props {
  labelText: string;
  name: string;
  value: string;
  width?: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select(props: Props) {
  const { labelText, name, value, width, options, onChange } = props;
  return (
    <div className="form-select-input" style={{ width }}>
      <label>{labelText}</label>

      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
