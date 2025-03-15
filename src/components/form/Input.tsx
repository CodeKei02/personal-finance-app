import { Field, useFormikContext } from "formik"
import styled from "styled-components";
import { colors } from "../../styles/theme";
import { Label, Error } from "./index";
import React from "react";
import { useDispatch } from "react-redux";


interface CustomInputProps {
  id: string;
  type: "text" | "number" | "search" | "checkbox" | "select" | "submit" | "radio";
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
  onChange?: (value: any) => void;
  dispatchAction?: (value: any) => any;
  width?: string;
  border?: string;
  direction?: string;
  marginleft?: string;
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
`;

const InputStyled = styled(Field)`
  width: ${({ width = "auto" }) => width};
  padding: 12px 15px;
  border-radius: 8px;
  border: ${({border = `1px solid ${colors.beigeNormal}`}) => border};
  color: ${colors.greyDark};
  margin-left: ${({ marginleft = "0rem" }) => marginleft};
`;

const SelectStyled = styled(Field)`
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid ${colors.beigeNormal};
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
  onChange,
  dispatchAction}) => {

  const { setFieldValue } = useFormikContext();
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.value;
    setFieldValue(name, value);

    if (onChange) onChange(value);
    if (dispatchAction) dispatch(dispatchAction(value));
  };

  return (
    <Container direction={direction} >
      <Label text={label} />

      {type === "checkbox" ? (
        <InputStyled
          type="checkbox"
          id={id}
          name={name}
          placeholder={placeholder}
          marginleft={marginleft}
          width={width}
          onChange={handleChange}
        />
      ) : type === "select" ? (
        <SelectStyled
          as="select" id={id}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          marginleft={marginleft}
          width={width} 
          >
          <option value="" disabled>{placeholder || "Select an option"}</option>
          {options?.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </ SelectStyled>
      ) : (
        <InputStyled
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          marginleft={marginleft}
          width={width}
          direction={direction}
          onChange={handleChange}
          border={border}
        />
      )}
      <Error name={name} />
    </Container>
  )
}
