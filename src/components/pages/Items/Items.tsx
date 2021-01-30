import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Header from "./Header";

const StyledMain = styled.main`
  background-color: #ebebeb;
  height: 100%;
`;

const Items: React.FC = () => {
  const router = useRouter();
  const { search } = router.query;

  return (
    <React.Fragment>
      <Header />
      <StyledMain>Items search: {search}</StyledMain>
    </React.Fragment>
  );
};

export default Items;
