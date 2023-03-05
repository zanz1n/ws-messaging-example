export interface SubmitButtonProps extends React.PropsWithChildren {
    enabled?: boolean;
}

export default function SubmitButton({ children, enabled }: SubmitButtonProps) {
    return (
        <button disabled={!(enabled ?? true)} type="submit" >{children}</button>
    );
}
