import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import useSWR from "swr";

import Api from "~/services/api";
import { useMainStore } from "~/stores/mainStore";
import Items from "./Items";

/**
 * SWR (stale-while-revalidate) es una estrategía que
 * primero retorna la data de la cache
 * luego realiza otra request (revalida)
 * y al final, te devuelve la data actualizada
 * https://swr.vercel.app/
 * https://nextjs.org/docs/basic-features/data-fetching#swr
 */
const ConnectedItems: React.FC = () => {
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

  return (
    <Items
      isValidating={isValidating}
      hasFoundItems={search && !store.items.length}
      items={store.items}
    />
  );
};

export default observer(ConnectedItems);
