import { render, screen } from "@testing-library/react";
import { MainStore, MainStoreProvider, IMainStore } from "~/stores/mainStore";

import Item from "./Item";

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
  free_shipping: false,
  description: "item-description",
  sold_quantity: 200,
};

const mockedCategories = ["Computación", "Laptops y Accesorios"];

const mockedAuthor = {
  name: "Juan Manuel",
  lastname: "Villarraza",
};

jest.mock("swr", () => () => ({
  data: {
    item: mockedItem,
    categories: mockedCategories,
    author: mockedAuthor,
  },
}));

describe("<Item />", () => {
  const mockedData = {
    data: {
      item: mockedItem,
      categories: mockedCategories,
      author: mockedAuthor,
    },
  };

  const renderWithStore = (store: IMainStore) => {
    return render(
      <MainStoreProvider value={store}>
        <Item data={mockedData as any} />
      </MainStoreProvider>
    );
  };

  it("should render Item page as expected", () => {
    const store = MainStore.create({
      author: mockedAuthor,
    });
    renderWithStore(store);

    expect(screen.getByAltText("item-img")).not.toBeNull();
    expect(screen.queryAllByText("Nuevo")).not.toBeNull();
    expect(screen.queryAllByText(" - 200 vendidos")).not.toBeNull();
    expect(screen.getByText("lenovo")).not.toBeNull();
    expect(screen.getByText("$ 1,000")).not.toBeNull();
    expect(screen.getByText("comprar")).not.toBeNull();
    expect(screen.getByText("Descripción del producto")).not.toBeNull();
    expect(screen.getByText("item-description")).not.toBeNull();
  });

  it("should render and set categories and author", () => {
    const store = MainStore.create({
      author: {
        name: "",
        lastname: "",
      },
    });
    renderWithStore(store);

    expect(store.categories).toStrictEqual(mockedCategories);
    expect(store.author).toStrictEqual(mockedAuthor);
  });
});
