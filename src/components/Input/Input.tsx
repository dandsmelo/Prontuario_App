import './style.css';

interface Props {
  labelText: string;
  value?: string;
  name?: string;
  type: string;
  width?: string;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: Props) {
  const { labelText, value, name, type, width, isDisabled, onChange } = props;

  return (
    <div className="form-input" style={{ width }}>
      <label>{labelText}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        disabled={isDisabled}
        required
      />
    </div>
  );
}
