import { Link } from "react-router-dom";
import styled from "styled-components";

export const BoxContainer = styled.form`
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 75px;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 2.5px rgba(15, 15, 15, 0.2);
`;

export const MutedLink = styled(Link)`
  font-size: 0.75rem;
  text-decoration: none;
  color: #cc4400;
  font-weight: 900;
  margin-left: 8rem;

  &:hover {
    color: rgb(6, 42, 30, 0.9);
  }
`;

export const MutedText = styled.p`
  font-size: 0.75rem;
  text-decoration: none;
  color: rgba(0, 0, 0);
  font-weight: 500;
`;

export const BoldLink = styled.a`
  font-size: 0.75rem;
  color: #cc4400;
  color: linear-gradient(
    65deg,
    rgba(6, 42, 30, 1) 20%,
    rgba(28, 168, 196, 1) 100%
  );
  font-weight: 900;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  height: 50px;
  font-size: 0.9em;
  border: 1px solid rgba(200, 200, 200, 0.03);
  padding: 0 10px;
  border-bottom: 1.5px solid transparent;
  transition: all 200ms ease-in-out;

  &:placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(6, 42, 30);
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  width: 100%;
  height: fit-content;
`;

export const AvatarImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  max-width: 2.5rem;
  margin-left: 0.5rem;
  border-radius: 100%;
`;

export const FileInput = styled.input`
  border-radius: 100px;
  width: 60%;
  height: 3.5vh;
  display: flex;
  padding: 0;
  &::file-selector-button {
    margin: 0;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 3.5vh;
    transition: all 0.4s;
    padding: 0 1vmax;
    color: rgba(12, 85, 61, 0.7);
    background-color: rgba(194, 194, 194, 0.4);
    font-size: 0.75rem;
    font-weight: 600;
    transition: all 0.5s;

    &:hover {
      background-color: rgba(194, 194, 194, 0.8);
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75em 40%;
  color: #fff;
  font-size: 1em;
  // margin-top: 27px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;

  transition: all, 240ms ease-in-out;

  background: rgb(6, 42, 30);
  // background: linear-gradient(
  //   65deg,
  //   rgba(6, 42, 30, 1) 20%,
  //   rgba(28, 168, 196, 1) 100%
  // );
  background: linear-gradient(135deg,#C1A582 0,#CC4400 100%);


  &:hover {
    filter: brightness(1.2) contrast(1.2);
  }
`;

export const SubmitButtoon = styled.button`
  width: 100%;
  padding: 1em 40%;
  color: #fff;
  font-size: 1em;
  // margin-top: 27px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;

  transition: all, 240ms ease-in-out;

  background: rgb(6, 42, 30);
  // background: linear-gradient(
  //   65deg,
  //   rgba(6, 42, 30, 1) 20%,
  //   rgba(28, 168, 196, 1) 100%
  // );
  background: linear-gradient(135deg,#C1A582 0,#CC4400 100%);


  &:hover {
    filter: brightness(1.2) contrast(1.2);
  }
`;
