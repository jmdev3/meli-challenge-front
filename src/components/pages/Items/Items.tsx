import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

import { useMainStore } from "~/stores/mainStore";
import ItemsList from "./ItemsList";

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
      {store.items.length > 0 && <ItemsList items={store.items} />}
    </React.Fragment>
  );
};

export default observer(Items);
