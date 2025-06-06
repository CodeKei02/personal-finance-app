import { Field, useFormikContext } from "formik";
import styled from "styled-components";
import { colors } from "../styles/theme";
import { Label, Error } from "./index";
import { useDispatch } from "react-redux";

interface CustomInputProps {
  id: string | any;
  type:
    | "text"
    | "number"
    | "search"
    | "checkbox"
    | "select"
    | "submit"
    | "radio"
    | any;
  name: string | any;
  label?: string | any;
  values?: string[];
  value?: string;
  placeholder?: string;
  options?: string[];
  onChange?: (value: any) => void;
  dispatchAction?: (value: any) => any;
  width?: string;
  border?: string;
  direction?: string;
  marginleft?: string;
  count?: number;
  maxLength?: number;
  setLength?: any;
  children?: any;
}

interface Container {
  direction?: string;
  marginleft?: string;
  background?: string;
}

const Container = styled.div<Container>`
  display: flex;
  flex-direction: ${({ direction = "column" }) => direction};
  margin: 1rem 0;

  .message-container {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
  }

  .radio-container {
    width: 120px;
    border: 1px solid ${colors.beigeNormal};
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: row-reverse;
  }
`;

const InputStyled = styled(Field)`
  width: ${({ width = "auto" }) => width};
  padding: 12px 15px;
  border-radius: 8px;
  border: ${({ border = `1px solid ${colors.beigeNormal}` }) => border};
  color: ${colors.greyDark};
  margin-left: ${({ marginleft = "0rem" }) => marginleft};
`;

const SelectStyled = styled(Field)`
  padding: 12px 20px;
  border-radius: 8px;
  border: ${({ border = `1px solid ${colors.beigeNormal}` }) => border};
  color: ${colors.greyDark};
`;

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
  count,
  setLength,
  children,
}) => {
  const { setFieldValue } = useFormikContext();
  const dispatch = useDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value: string | number = event.target.value;
    if (type === "number" && value !== "") value = Number(value);

    if (type === "text" && maxLength) {
      count = event.target.value.length;
      setLength(count++);

      if (event.target.value.length === 0) {
        setLength(0);
      }
    }

    setFieldValue(name, value);

    if (onChange) onChange(value);
    if (dispatchAction) dispatch(dispatchAction(value));
  };

  return (
    <Container direction={direction}>
      {type === "checkbox" ? (
        <>
          <Label text={label} htmlFor={label} />
          <Field name={name} className="checkbox">
            {({ field }: any) => (
              <InputStyled
                {...field}
                type="checkbox"
                id={id}
                placeholder={placeholder}
                marginleft={marginleft}
                width={width}
                onChange={(event: any) => {
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
          <Label text={label} htmlFor={name} />
          <Field name={name}>
            {({ field }: any) => (
              <SelectStyled
                {...field}
                as="select"
                id={id}
                placeholder={placeholder}
                onChange={handleChange}
                marginleft={marginleft}
                width={width}
                border={border}
              >
                <option value="" disabled>
                  {placeholder || "Select an option"}
                </option>
                {options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </SelectStyled>
            )}
          </Field>
        </>
      ) : type === "radio" ? (
        <div className="radio-container">
          <Label text={label} htmlFor={name} />
          <Field name={name}>
            {({ field }: any) => (
              <InputStyled
                {...field}
                type="radio"
                id={id}
                value={value}
                placeholder={placeholder}
                marginleft={marginleft}
                width={width}
                onChange={(event: any) => {
                  field.onChange(event);
                  if (onChange) onChange(event.target.value);
                }}
              />
            )}
          </Field>
        </div>
      ) : (
        <>
          <Label text={label} htmlFor={name} />
          <Field name={name}>
            {({ field }: any) => (
              <InputStyled
                {...field}
                id={id}
                type={type}
                placeholder={placeholder}
                marginleft={marginleft}
                width={width}
                direction={direction}
                onChange={handleChange}
                border={border}
                maxLength={maxLength}
              />
            )}
          </Field>
        </>
      )}
      <div className="message-container">
        <Error name={name} />
        {children}
      </div>
    </Container>
  );
};
