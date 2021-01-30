import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Item: React.FC = () => {
  const router = useRouter();
  const { itemId } = router.query;

  return <Wrapper>Item: {itemId}</Wrapper>;
};

export default Item;
