import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

import { useMainStore } from "~/stores/mainStore";
import Header from "./Header";

const StyledMain = styled.main`
  background-color: #ebebeb;
  height: 100%;
`;

const Items: React.FC = () => {
  const router = useRouter();
  const { search } = router.query;
  const store = useMainStore();

  useEffect(() => {
    if (search) {
      store.searchItems(search as string);
    }
  }, [search]);

  return (
    <React.Fragment>
      <Header />
      <StyledMain>
        Items search: {search} - {store.items.length}
      </StyledMain>
    </React.Fragment>
  );
};

export default observer(Items);
