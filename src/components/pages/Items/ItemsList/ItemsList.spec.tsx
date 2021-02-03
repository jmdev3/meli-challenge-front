import { render, screen } from "@testing-library/react";

import ItemsList from "./ItemsList";
import { IItem } from "~/stores/mainStore";

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
} as IItem;

describe("<ItemsList />", () => {
  it("should render empty ItemsList", () => {
    const { container } = render(<ItemsList items={[]} />);

    expect(container.querySelector("ul")).not.toBeNull();
    expect(container.querySelector("li")).toBeNull();
  });

  it("sould render ItemsList with one element", () => {
    const { container } = render(<ItemsList items={[mockedItem]} />);

    expect(container.querySelector("ul")).not.toBeNull();
    expect(container.querySelector("li")).not.toBeNull();
    expect(screen.getByAltText("item-img")).not.toBeNull();
    expect(screen.getByText("$ 1,000")).not.toBeNull();
    expect(screen.getByTestId("free-shipping")).not.toBeNull();
    expect(screen.queryAllByText("Nuevo")).not.toBeNull();
    expect(screen.queryAllByText("lenovo")).not.toBeNull();
  });

  it("sould render ItemsList with multiple element", () => {
    const mockedItem2 = {
      id: "item-id-2",
      title: "lenovo 2",
      price: {
        currency: "ARS",
        amount: 1001,
        decimals: 2,
      },
      picture: "http://http2.mlstatic.com/D_961352-MLA42764591253_072020-O.jpg",
      condition: "used",
      free_shipping: true,
    } as IItem;

    const { container } = render(
      <ItemsList items={[mockedItem, mockedItem2]} />
    );

    expect(container.querySelector("ul")).not.toBeNull();
    expect(container.querySelector("li")).not.toBeNull();
    expect(screen.getAllByAltText("item-img")).toHaveLength(2);
    expect(screen.getByText("$ 1,001")).not.toBeNull();
    expect(screen.getAllByTestId("free-shipping")).toHaveLength(2);
    expect(screen.queryAllByText("Usado")).not.toBeNull();
    expect(screen.queryAllByText("lenovo 2")).not.toBeNull();
  });
});
