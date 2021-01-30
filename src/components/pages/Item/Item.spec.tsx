import { render, screen } from "@testing-library/react";
import Item from "./Item";

describe("<Item />", () => {
  it("should render Item page as expected", () => {
    render(<Item />);

    expect(screen.getByText("Item")).not.toBeNull();
  });
});
