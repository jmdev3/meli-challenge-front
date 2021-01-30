import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("<Home />", () => {
  it("should render home page as expected", () => {
    render(<Home />);

    expect(screen.getByText("Basic App")).not.toBeNull();
  });
});
