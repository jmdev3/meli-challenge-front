import { createContext, useContext } from "react";
import { types, Instance, flow, getEnv, applySnapshot } from "mobx-state-tree";

const Item = types.model("Item", {
  id: "",
  title: "",
  price: types.model({
    currency: "",
    amount: types.number,
    decimals: types.number,
  }),
  picture: "",
  condition: "",
  free_shipping: types.boolean,
  sold_quantity: types.maybe(types.number),
});

export const MainStore = types
  .model("MainStore", {
    author: types.model({
      name: "",
      lastname: "",
    }),
    items: types.array(Item),
    categories: types.array(types.string),
  })
  .actions((self) => {
    const searchItems = flow(function* (queryString: string) {
      const { api } = getEnv(self);

      try {
        const response = yield api.searchItems({ search: queryString });
        applySnapshot(self.author, response.data.author);
        applySnapshot(self.categories, response.data.categories);
        applySnapshot(self.items, response.data.items);
      } catch (error) {
        console.log("error: ", error);
      }
    });

    return {
      searchItems,
    };
  });

export interface IItem extends Instance<typeof Item> {}
export interface IMainStore extends Instance<typeof MainStore> {}
const MainStoreContext = createContext<IMainStore>(null);
export const MainStoreProvider = MainStoreContext.Provider;
export const useMainStore = () => useContext<IMainStore>(MainStoreContext);
