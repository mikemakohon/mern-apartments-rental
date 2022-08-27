import { StyledButton } from "./styled";

export const Button = ({ title, bgColor, handleClick }) => {
  return (
    <StyledButton bgColor={bgColor} onClick={handleClick}>
      {title}
    </StyledButton>
  );
};
