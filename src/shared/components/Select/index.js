import React from "react";
import styled from "styled-components";

export const SelectStyled = styled.select`
  border: 2px solid ${(props) => props.bgColor};
  background: rgb(223, 225, 230);
  display: block;
  padding: 4px 8px;
  color: ${(props) => props.color};
  font-size: 14px;
  margin: 0 15px 0 0;
  border-radius: 5px;
  width: 100%;
  background: rgb(223, 225, 230);
  position: relative;

  &:active {
    background: #ffffff;
    border: 2px solid rgb(7, 71, 166);
  }
`;

export const Option = styled.option``;

export default function Select({
  name,
  options,
  defaultValue,
  value,
  ...props
}) {
  return (
    <SelectStyled name={name} {...props}>
      <Option disabled selected>
        {defaultValue}
      </Option>
      {options.map((option, idx) => (
        <Option key={idx} selected={value === option.profileName && value}>
          {option.profileName}
        </Option>
      ))}
    </SelectStyled>
  );
}
