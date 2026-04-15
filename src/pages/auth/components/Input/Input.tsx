import './style.css';

interface Props {
  labelText: string;
  value: string;
  name?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: Props) {
  const { labelText, value, name, type, onChange } = props;

  return (
    <div className="auth-input">
      <label>{labelText}</label>
      <input type={type} value={value} name={name} onChange={onChange} required />
    </div>
  );
}
