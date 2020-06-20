import styled from "styled-components";

export const TabStyled = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

export const TabList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  flex: 1;
  padding: 0;
  margin: 0;
`;

export const Tab = styled.li`
  display: flex;
`;

export const TabBody = styled.div`
  display: flex;
`;

export const TabHead = styled.h3`
  flex: 1;
`;

export const TabDetail = styled.p`
  flex: 1;
`;

export const TabContent = styled.div`
  flex: 10;
  font-size: 14px;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;
