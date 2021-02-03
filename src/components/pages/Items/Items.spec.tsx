import { render, screen } from "@testing-library/react";
import { IItem } from "~/stores/mainStore";

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

describe("<Items />", () => {
  it("should render Item page as expected", () => {
    render(
      <Items
        isValidating={false}
        hasFoundItems={false}
        items={[mockedItem as IItem]}
      />
    );

    expect(screen.getByAltText("item-img")).not.toBeNull();
    expect(screen.getByText("$ 1,000")).not.toBeNull();
    expect(screen.getByTestId("free-shipping")).not.toBeNull();
    expect(screen.queryAllByText("Nuevo")).not.toBeNull();
    expect(screen.queryAllByText("lenovo")).not.toBeNull();
  });

  it("should render Item in loading state", () => {
    render(<Items isValidating={true} hasFoundItems={false} items={[]} />);

    expect(screen.getByTestId("skeleton-wrapper")).not.toBeNull();
  });

  it("should render Item in with not found state", () => {
    render(<Items isValidating={false} hasFoundItems={true} items={[]} />);

    expect(
      screen.getByText("No hay publicaciones que coincidan con tu búsqueda.")
    ).not.toBeNull();
  });
});
