import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import useSWR from "swr";

import Api from "~/services/api";
import { useMainStore } from "~/stores/mainStore";
import Items from "./Items";

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
