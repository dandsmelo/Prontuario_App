import React from "react";
import "./style.css"
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

interface Props {
    labelText: string;
    value: string;
    name?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput(props: Props) {
    const { labelText, value, name, onChange } = props;
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="auth-input">
            <label>{labelText}</label>
            <div className="password-wrapper">
                <input type={showPassword ? "text" : "password"} value={value} name={name} onChange={onChange} />
                <button type="button" className="eye-btn" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <IoIosEyeOff /> : <IoMdEye />}
                </button>
            </div>
        </div>
    )
}