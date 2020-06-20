import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const IconStyle = styled.i`
  @media (max-width: 1100px) {
    transition: all ease-in-out 0.3s;
    &:hover {
      border-radius: 10px;
      transition: all ease-in-out 0.3s;
    }
  }
`;

export default function Icon({ icon }) {
  return (
    <IconStyle>
      <FontAwesomeIcon icon={icon} />
    </IconStyle>
  );
}
