import styled from "styled-components";

export default function Button({ content }) {
  return <StyledButton>{content}</StyledButton>;
}

const StyledButton = styled.button`
  background: linear-gradient(to right, #f7c205 0%, #eed579 79%);
  text-transform: uppercase;
  font-family: "Cormorant Upright";
  font-weight: 900;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: black;
  border-radius: 2rem;
  cursor: pointer;
`;
