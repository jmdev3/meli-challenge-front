import { render, screen } from "@testing-library/react";

import Items from "./Items";

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
};

const mockedCategories = ["Computación", "Laptops y Accesorios"];

const mockedAuthor = {
  name: "Juan Manuel",
  lastname: "Villarraza",
};

jest.mock("swr", () => () => ({
  data: {
    items: [mockedItem],
    categories: mockedCategories,
    author: mockedAuthor,
  },
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      search: "lenovo",
    },
  }),
}));

jest.mock("~/stores/mainStore", () => ({
  useMainStore: () => ({
    items: [mockedItem],
    author: {
      name: "",
      lastname: "",
    },
    categories: [],
    setItems: jest.fn(),
    setAuthor: jest.fn(),
    setCategories: jest.fn(),
  }),
}));

describe("<Items />", () => {
  it("should render Item page as expected", () => {
    render(<Items />);

    expect(screen.getByAltText("item-img")).not.toBeNull();
    expect(screen.getByText("$ 1,000")).not.toBeNull();
    expect(screen.getByTestId("free-shipping")).not.toBeNull();
    expect(screen.queryAllByText("Nuevo")).not.toBeNull();
    expect(screen.queryAllByText("lenovo")).not.toBeNull();
  });
});
