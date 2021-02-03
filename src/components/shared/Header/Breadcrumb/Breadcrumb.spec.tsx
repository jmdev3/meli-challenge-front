import { render, screen } from "@testing-library/react";

import Breadcrumb from "./Breadcrumb";

describe("<Item />", () => {
  const mockedCategories = ["Computación", "Laptops y Accesorios"];

  it("should render Breadcrumb as expected", () => {
    const { container } = render(<Breadcrumb categories={mockedCategories} />);

    expect(container.querySelector("ul")).not.toBeNull();
    expect(container.querySelector("li")).not.toBeNull();
    mockedCategories.map((text) =>
      expect(screen.getByText(text)).not.toBeNull()
    );
  });

  it("should render empty Breadcrumb", () => {
    const { container } = render(<Breadcrumb categories={[]} />);

    expect(container.querySelector("ul")).not.toBeNull();
    expect(container.querySelector("li")).toBeNull();
  });
});
