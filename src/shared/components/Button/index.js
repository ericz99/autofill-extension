import React from "react";
import styled from "styled-components";

import Icon, { IconStyle } from "../Icon";

export const ButtonStyled = styled.button`
  padding: 12px 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.bgColor};
  color: #ffffff;
  cursor: pointer;
  border-radius: 5px;
  position: relative;
  margin-right: 15px;
  width: 100%;
  ${IconStyle} {
    margin-left: 10px;
  }
`;

export const ButtonText = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export default function Button({
  type,
  onClick,
  children,
  icon,
  bgColor,
  ...props
}) {
  return (
    <ButtonStyled type={type} onClick={onClick} bgColor={bgColor} {...props}>
      <ButtonText>{children}</ButtonText>
      {icon && <Icon icon={icon} />}
    </ButtonStyled>
  );
}
