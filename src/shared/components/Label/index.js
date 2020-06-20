import React from "react";
import styled from "styled-components";

import { IconStyle } from "../Icon";

export const LabelStyled = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
  color: ${(props) => props.color};
  font-weight: 500;
  ${IconStyle} {
    padding: 8px;
    font-weight: 200;
    color: rgba(65, 76, 86, 0.6);
  }
`;

export default function Label({ children, color }) {
  return <LabelStyled color={color}>{children}</LabelStyled>;
}
