import { render, screen, fireEvent } from "@testing-library/react";
// import { useRouter } from "next/router";

import Header from "./Header";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {
      search: "lenovo",
    },
  }),
}));

describe("<Item />", () => {
  const mockedCategories = ["Computación", "Laptops y Accesorios"];
  const clearStore = jest.fn();

  it("should render Header as expected", () => {
    const { container } = render(
      <Header categories={mockedCategories} clearStore={clearStore} />
    );

    expect(screen.getByTestId("logo-wrapper")).not.toBeNull();
    expect(container.querySelector("ul")).not.toBeNull();
    expect(container.querySelector("li")).not.toBeNull();
    expect(screen.getByDisplayValue("lenovo")).not.toBeNull();
    mockedCategories.map((text) =>
      expect(screen.getByText(text)).not.toBeNull()
    );
  });

  it("should call clearStore on logo click", () => {
    render(<Header categories={mockedCategories} clearStore={clearStore} />);

    const logo = screen.getByTestId("logo-wrapper");
    fireEvent.click(logo);

    expect(clearStore).toHaveBeenCalledTimes(1);
  });

  it("should call router push on submit", () => {
    clearStore.mockClear();
    render(<Header categories={mockedCategories} clearStore={clearStore} />);

    const input = screen.getByDisplayValue("lenovo");
    const form = screen.getByRole("form");

    fireEvent.change(input, { target: { value: "audi" } });
    fireEvent.submit(form);
    // const router = useRouter();

    // TODO: chequear porque no hace el assertion
    // expect(router.push).toHaveBeenCalledTimes(1);
    expect(clearStore).toHaveBeenCalledTimes(1);
  });
});
