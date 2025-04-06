import { FormEvent, ReactNode } from "react"

interface BaseFormProps {
    handleForm: () => void,
    fieldName: string,
    children: ReactNode,
}

export default function BaseForm(props: BaseFormProps) {
    return (
        <form onSubmit={(event: FormEvent) => {
            event.preventDefault();
            props.handleForm();
        }}>
            <fieldset>
                <legend>{props.fieldName}</legend>
                {props.children}
            </fieldset>
        </form>
    )
}