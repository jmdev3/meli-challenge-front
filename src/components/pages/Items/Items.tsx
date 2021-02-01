import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

import { useMainStore } from "~/stores/mainStore";
import ItemsList from "./ItemsList";

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: #ebebeb;
  padding-top: 16px;
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
      <StyledMain>
        {store.items.length > 0 && <ItemsList items={store.items} />}
      </StyledMain>
    </React.Fragment>
  );
};

export default observer(Items);
