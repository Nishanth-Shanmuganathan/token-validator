import { FC, useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Input } from 'antd';
import Error from '../Error';
import "./inputField.scss"

const { TextArea } = Input

interface InputFieldProps {
    type: string;
    title?: string;
    name: string;
    placeholder: string;
    onChange?: (value: any) => void
}

const InputField: FC<InputFieldProps> = (props) => {
    const {
        title,
        type,
        name,
    } = props;

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

    return (
        <div>
            <Field name={name}>
                {({ field, meta, form }: any) => type === "textarea"
                    ? <div className={`input-field__wrapper`}>
                        {title && <label htmlFor={name}>{title}</label>}
                        <TextArea
                            {...field}
                            {...props}
                            rows={3}
                        ></TextArea>
                    </div>
                    : <div className={`input-field__wrapper`}>
                        {title && <label htmlFor={name}>{title}</label>}
                        <Input
                            {...field}
                            {...props}
                            autoComplete="off"
                            className={meta.touched && form.errors[name] && 'error-field'}
                            onPaste={(event) => type === "password" && event.preventDefault()}
                            type={type !== "password" ? type : passwordVisible ? "text" : "password"}
                            suffix={type === "password" ? <span onClick={() => setPasswordVisible(prev => !prev)}>
                                {passwordVisible
                                    ? <i className="input-password-visibility-off icon-happy" />
                                    : <i className="icon-happy"></i>}
                            </span> : undefined}
                        />
                    </div>
                }
            </Field>
            <ErrorMessage name={name}>
                {(message: string) => <Error message={message} />}
            </ErrorMessage>
        </div >
    )
}

export default InputField;