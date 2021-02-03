import { render, screen } from "@testing-library/react";

import Item from "./Item";

describe("<Item />", () => {
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

  it("should render Item page as expected", () => {
    render(<Item item={mockedItem} />);

    expect(screen.getByAltText("item-img")).not.toBeNull();
    expect(screen.queryAllByText("Nuevo")).not.toBeNull();
    expect(screen.queryAllByText(" - 200 vendidos")).not.toBeNull();
    expect(screen.getByText("lenovo")).not.toBeNull();
    expect(screen.getByText("$ 1,000")).not.toBeNull();
    expect(screen.getByText("comprar")).not.toBeNull();
    expect(screen.getByText("Descripción del producto")).not.toBeNull();
    expect(screen.getByText("item-description")).not.toBeNull();
  });

  it("should render empty view when item is not provided", () => {
    const { container } = render(<Item item={null} />);

    expect(container).toBeEmptyDOMElement();
  });
});
