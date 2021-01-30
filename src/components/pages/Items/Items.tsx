import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button``;

const Items: React.FC = () => {
  const router = useRouter();
  const { search } = router.query;

  function mockedShallowSearch() {
    /**
     * shallow routing me permite modificar la url
     * sin correr metodos data fetching de nuevo
     * https://nextjs.org/docs/routing/shallow-routing
     */
    router.push("/items?search=iphone", undefined, { shallow: true });
  }

  return (
    <Wrapper>
      <Button onClick={mockedShallowSearch}>click</Button>
      Items search: {search}
    </Wrapper>
  );
};

export default Items;
