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
  description: "",
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
        self.items.clear();
        self.categories.clear();
        const response = yield api.searchItems({ search: queryString });
        applySnapshot(self.author, response.data.author);
        applySnapshot(self.categories, response.data.categories);
        applySnapshot(self.items, response.data.items);
      } catch (error) {
        alert("Hubo un error el buscar los productos!");
        console.log("> searchItems error: ", error);
      }
    });

    function clearStore() {
      self.items.clear();
      self.categories.clear();
    }

    function setCategories(categories: string[]) {
      self.categories.replace(categories);
    }

    function setAuthor(author: { name: string; lastname: string }) {
      self.author = author;
    }

    return {
      searchItems,
      clearStore,
      setCategories,
      setAuthor,
    };
  });

export interface IItem extends Instance<typeof Item> {}
export interface IMainStore extends Instance<typeof MainStore> {}
const MainStoreContext = createContext<IMainStore>(null);
export const MainStoreProvider = MainStoreContext.Provider;
export const useMainStore = () => useContext<IMainStore>(MainStoreContext);
