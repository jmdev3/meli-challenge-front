import { MainStore } from "./mainStore";

describe("MainStore", () => {
  const mockedItem = {
    id: "item-id",
    title: "lenovo",
    price: {
      currency: "ARS",
      amount: 1000,
      decimals: 2,
    },
    picture: "http://http2.mlstatic.com/D_961352-MLA42764591253_072020-O.jpg",
    condition: "new",
    free_shipping: true,
    description: "item description",
    sold_quantity: 2,
  };

  const mockedCategories = ["Computación", "Laptops y Accesorios"];

  const mockedAuthor = {
    name: "Juan Manuel",
    lastname: "Villarraza",
  };

  it("should init store as expected", () => {
    const store = MainStore.create({ author: { name: "", lastname: "" } });

    expect(store).toMatchSnapshot();
    expect(store.items).toHaveLength(0);
    expect(store.categories).toHaveLength(0);
    expect(store.author).toStrictEqual({
      name: "",
      lastname: "",
    });
  });

  describe("store actions", () => {
    it("should setItems as expected", () => {
      const store = MainStore.create({ author: { name: "", lastname: "" } });
      store.setItems([mockedItem]);
      const item = store.items[0];

      expect(item.id).toBe(mockedItem.id);
      expect(item.title).toBe(mockedItem.title);
      expect(item.price.currency).toBe(mockedItem.price.currency);
      expect(item.price.amount).toBe(mockedItem.price.amount);
      expect(item.price.decimals).toBe(mockedItem.price.decimals);
      expect(item.picture).toBe(mockedItem.picture);
      expect(item.condition).toBe(mockedItem.condition);
      expect(item.free_shipping).toBe(mockedItem.free_shipping);
      expect(item.sold_quantity).toBe(mockedItem.sold_quantity);
      expect(item.description).toBe(mockedItem.description);
    });

    it("should setCategories as expected", () => {
      const store = MainStore.create({ author: { name: "", lastname: "" } });
      store.setCategories(mockedCategories);

      expect(store.categories).toStrictEqual(mockedCategories);
    });

    it("should setAuthor as expected", () => {
      const store = MainStore.create({ author: { name: "", lastname: "" } });
      store.setAuthor(mockedAuthor);

      expect(store.author).toStrictEqual(mockedAuthor);
    });

    it("should clearStore as expected", () => {
      const store = MainStore.create({ author: { name: "", lastname: "" } });
      store.setItems([mockedItem]);
      store.setCategories(mockedCategories);
      store.setAuthor(mockedAuthor);
      store.clearStore();

      expect(store.items).toHaveLength(0);
      expect(store.categories).toHaveLength(0);
      expect(store.author).toStrictEqual({
        name: "Juan Manuel",
        lastname: "Villarraza",
      });
    });
  });
});
