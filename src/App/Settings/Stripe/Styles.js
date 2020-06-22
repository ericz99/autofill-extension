import styled from "styled-components";

export const SiteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 25px;
`;

export const SiteHeader = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 65px;

  &:before {
    content: "";
    display: inline-block;
    position: absolute;
    left: 0;
    height: 2px;
    width: 15%;
    background: #ffffff;
  }

  &:after {
    content: "";
    display: inline-block;
    position: absolute;
    right: 0;
    height: 2px;
    width: 58%;
    background: #ffffff;
  }
`;

export const SiteRadio = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-top: 15px;
  font-size: 13px;
`;
