import React from "react";
import styled from "styled-components";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface INotFound {
  text: string;
}

const NotFoundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 750px;
  padding: 24px 8px;
  background-color: #fff;
  border-radius: 4px;
  justify-content: space-around;
  padding: 50px 8px;
`;

const NotFound: React.FC<INotFound> = ({ text }) => (
  <NotFoundWrapper>
    <AiOutlineExclamationCircle size={50} />
    <h3>{text}</h3>
  </NotFoundWrapper>
);

export default NotFound;
