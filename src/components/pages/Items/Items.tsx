import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import useSWR from "swr";

import Api from "~/services/api";
import { useMainStore } from "~/stores/mainStore";
import ItemsList from "./ItemsList";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 750px;
  padding: 24px 8px;
  background-color: #fff;
`;

const Items: React.FC = () => {
  const router = useRouter();
  const { search } = router.query;
  const store = useMainStore();

  const fetcher = (url) => Api.searchItems(url);
  const { data, isValidating } = useSWR(
    search ? `/items?search=${search}` : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      store.setItems(data.items);
      store.setCategories(data.categories);
      if (store.author.name === "") {
        store.setAuthor(data.author);
      }
    }
  }, [data]);

  if (isValidating) {
    return <Wrapper>Buscando...</Wrapper>;
  }

  if (search && !store.items.length) {
    return (
      <Wrapper>
        <h3>No hay publicaciones que coincidan con tu búsqueda.</h3>
      </Wrapper>
    );
  }

  return (
    <React.Fragment>
      {store.items.length > 0 && <ItemsList items={store.items} />}
    </React.Fragment>
  );
};

export default observer(Items);
