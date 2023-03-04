import "../../css/Login.css";

export interface InputLabelProps {
    type: React.HTMLInputTypeAttribute
    identifier: string;
    required?: boolean;
    withError?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputLabel({ required, type, identifier, children, onChange }: React.PropsWithChildren<InputLabelProps>) {
    return (
        <div className="input-label">
            <label htmlFor={identifier}>{children}</label>
            <div className="form-input">
                <input onChange={onChange} required={required} type={type} name={identifier} id={identifier} />
            </div>
        </div>
    );
}
