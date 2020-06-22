import React from "react";
import styled from "styled-components";
import Checkbox from "rc-checkbox";

export const Label = styled.label`
  margin-left: 15px;
`;

export default function Radio({
  defaultCheck,
  type,
  onChange,
  name,
  ...props
}) {
  return (
    <Label>
      <Checkbox
        name={name}
        type={type}
        defaultChecked={defaultCheck}
        onChange={onChange}
        {...props}
      />
    </Label>
  );
}
