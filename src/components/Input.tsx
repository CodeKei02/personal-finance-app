import { Field, useFormikContext } from "formik";
import { Label } from "./Label";
import { Error } from "./Error";
import { useDispatch } from "react-redux";
import { colors } from "@/styles/colors";

type InputChangeValue = string | number | boolean;

interface CustomInputProps {
  id: string;
  type:
    | "text"
    | "number"
    | "search"
    | "checkbox"
    | "select"
    | "submit"
    | "radio";
  name: string;
  label?: string;
  values?: string[];
  value?: string;
  placeholder?: string;
  options?: string[];
  onChange?: (value: InputChangeValue) => void;
  dispatchAction?: (
    value: string | number
  ) => import("@reduxjs/toolkit").UnknownAction;
  width?: string;
  border?: string;
  direction?: "row" | "column";
  marginleft?: string;
  count?: number;
  maxLength?: number;
  setLength?: (length: number) => void;
  children?: React.ReactNode;
  className?: string;
}

interface FormikFieldProps {
  field: {
    value: string | number | boolean;
    name: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  };
}

export const Input: React.FC<CustomInputProps> = ({
  id,
  type,
  name,
  label,
  placeholder,
  options,
  direction,
  marginleft,
  width,
  border,
  value,
  maxLength,
  onChange,
  dispatchAction,
  setLength,
  children,
  className: inputClassName,
}) => {
  const { setFieldValue } = useFormikContext();
  const dispatch = useDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value: string | number = event.target.value;
    if (type === "number" && value !== "") value = Number(value);

    if (type === "text" && maxLength && setLength) {
      const length = event.target.value.length;
      setLength(length);
    }

    setFieldValue(name, value);

    if (onChange) onChange(value);
    if (dispatchAction) dispatch(dispatchAction(value));
  };

  const getDirectionClass = () => {
    return direction === "row"
      ? "flex-row"
      : direction === "column"
      ? "flex-col"
      : "flex-col";
  };

  const inputBaseClasses = "rounded-lg text-greyDark";
  const inputBorder = border || `1px solid ${colors.beigeNormal}`;

  return (
    <div className={`flex ${getDirectionClass()} my-4`}>
      {type === "checkbox" ? (
        <>
          {label && <Label text={label} htmlFor={id} />}
          <Field name={name} className="checkbox">
            {({ field }: FormikFieldProps) => (
              <Field
                {...field}
                type="checkbox"
                id={id}
                placeholder={placeholder}
                className={`${inputBaseClasses} py-3 px-4`}
                style={{
                  width: width || "auto",
                  marginLeft: marginleft || "0rem",
                  border: inputBorder,
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(event);
                  if (onChange) onChange(event.target.checked);
                }}
                checked={field.value}
              />
            )}
          </Field>
        </>
      ) : type === "select" ? (
        <>
          {label != null && <Label text={label} htmlFor={name} />}
          <Field name={name}>
            {({ field }: FormikFieldProps) => (
              <Field
                {...field}
                as="select"
                id={id}
                placeholder={placeholder}
                onChange={handleChange}
                className={`${inputBaseClasses} py-3 px-5`}
                style={{
                  width: width || "auto",
                  marginLeft: marginleft || "0rem",
                  border: border || inputBorder,
                }}
              >
                <option value="" disabled>
                  {placeholder || "Select an option"}
                </option>
                {options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
            )}
          </Field>
        </>
      ) : type === "radio" ? (
        <div className="w-[120px] border border-beigeNormal rounded-lg p-4 flex flex-row-reverse">
          {label != null && <Label text={label} htmlFor={name} />}
          <Field name={name}>
            {({ field }: FormikFieldProps) => (
              <Field
                {...field}
                type="radio"
                id={id}
                value={value}
                placeholder={placeholder}
                className={`${inputBaseClasses} py-3 px-4`}
                style={{
                  width: width || "auto",
                  marginLeft: marginleft || "0rem",
                  border: inputBorder,
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(event);
                  if (onChange) onChange(event.target.value);
                }}
              />
            )}
          </Field>
        </div>
      ) : (
        <>
          {label != null && <Label text={label} htmlFor={name} />}
          <Field name={name}>
            {({ field }: FormikFieldProps) => (
              <Field
                {...field}
                id={id}
                type={type}
                placeholder={placeholder}
                className={`${inputBaseClasses} py-3 px-4 ${
                  inputClassName ?? ""
                }`.trim()}
                style={{
                  width: width || "auto",
                  marginLeft: marginleft || "0rem",
                  border: border || inputBorder,
                }}
                onChange={handleChange}
                maxLength={maxLength}
              />
            )}
          </Field>
        </>
      )}
      <div className="flex justify-between mt-2">
        <Error name={name} />
        {children}
      </div>
    </div>
  );
};
