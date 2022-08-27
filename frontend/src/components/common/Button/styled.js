import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor || "#333333"};
  color: #eeeeee;
  padding: 15px 25px;
  border: none;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: 0.2s;
  }
`;
