import React from "react";
import styled from "styled-components";

export const InputStyled = styled.input`
  display: block;
  padding: 5px 8px;
  color: ${(props) => props.color};
  font-size: 14px;
  margin: 0 15px 0 0;
  border-radius: 5px;
  width: 100%;
  background: none;
  border: 2px solid ${(props) => props.bgColor};
  background: rgb(223, 225, 230);
  &:focus {
    background: #ffffff;
    border: 2px solid rgb(7, 71, 166);
  }
`;

export default function Input({
  type,
  disabled,
  onChange,
  placeholder,
  value,
  name,
  className,
  color,
  bgColor,
  ...props
}) {
  return (
    <InputStyled
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      value={value}
      className={className}
      color={color}
      bgColor={bgColor}
      disabled={disabled}
      {...props}
    />
  );
}
