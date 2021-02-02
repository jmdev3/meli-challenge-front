import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import useSWR from "swr";

import Api from "~/services/api";
import { useMainStore } from "~/stores/mainStore";
import ItemsList from "./ItemsList";

const Items: React.FC = () => {
  const router = useRouter();
  const { search } = router.query;
  const store = useMainStore();

  const fetcher = (url) => Api.searchItems(url);
  const { data } = useSWR(search ? `/items?search=${search}` : null, fetcher);

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
    <React.Fragment>
      {store.items.length > 0 && <ItemsList items={store.items} />}
    </React.Fragment>
  );
};

export default observer(Items);
