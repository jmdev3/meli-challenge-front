import { render, screen } from "@testing-library/react";
import Items from "./Items";

describe("<Items />", () => {
  it("should render Items page as expected", () => {
    render(<Items />);

    expect(screen.getByText("Items")).not.toBeNull();
  });
});
