import styled from "styled-components";

export const TabBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TabHead = styled.h3`
  flex: 1;
  color: rgba(149, 165, 166, 1);
  font-size: 14px;
  font-weight: 100;
  background: none;
`;

export const TabDetail = styled.p`
  flex: 1;
  font-size: 14px;
  margin-top: 10px;
  color: rgba(171, 183, 183, 1);
`;

export const TabStyled = styled.li`
  display: inline-block;
  position: relative;
  border-bottom: 2px solid #e8e8e8;
  cursor: pointer;
  margin: 0 15px 0 0;
  height: 25px;

  &.active {
    border-bottom: 2px solid #2574a9;
    ${TabHead} {
      color: #2574a9;
    }
  }
`;
