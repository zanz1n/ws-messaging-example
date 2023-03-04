import "../../css/Login.css";

export interface FormProps {
    type: "login" | "register";
    error?: string | null;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}

export default function Form({ children, error, onSubmit, type }: React.PropsWithChildren<FormProps>) {
    return (
        <form className={type} onSubmit={onSubmit}>
            <div className={`top-error${error ? "" : " invisible"}`}>
                <p>{error ?? "-"}</p>
            </div>
            {children}
            <div className="top-error invisible"><p>-</p></div>
        </form>
    );
}
