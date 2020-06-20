import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SmallHelpText = styled.small`
  display: block;
  font-size: 11px;
  color: rgba(65, 76, 86, 1);
  line-height: 18px;
  margin-top: 5px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const FormControl = styled.div`
  display: block;
  margin: 0 0 10px 0;
  width: 100%;
  flex: 1;
`;

export const SplitControl = styled.div`
  display: block;
  width: 100%;
  flex: 1;
  margin-bottom: 10px;

  &:nth-child(1) {
    margin-right: 5px;
  }

  &:nth-child(3) {
    margin-left: 5px;
  }
`;

export const Row = styled.div`
  display: flex;
`;

export const Header = styled.div`
  font-size: 14px;
  font-weight: 100;
  display: block;
  text-align: center;
  margin-bottom: 15px;
`;
