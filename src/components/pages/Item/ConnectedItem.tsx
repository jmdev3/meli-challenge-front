import React, { useEffect } from "react";
import { observer } from "mobx-react";
import useSWR from "swr";
import { isEmpty } from "lodash";

import Api from "~/services/api";
import { useMainStore } from "~/stores/mainStore";

import Item from "./Item";

/**
 * https://github.com/vercel/swr#ssr-with-nextjs
 */
const ConnectedItem: React.FC<any> = (props) => {
  const store = useMainStore();
  const fetcher = () => Api.getItem(props.data.item.id);
  const { data } = useSWR(null, fetcher, { initialData: props.data as any });
  const item = data ? data.item : null;

  useEffect(() => {
    if (!isEmpty(data)) {
      if (store.categories.length === 0) {
        store.setCategories(data.categories);
      }
      if (store.author.name === "") {
        store.setAuthor(data.author);
      }
    }
  }, []);

  return <Item item={item} />;
};

export default observer(ConnectedItem);
