import { render, screen, fireEvent } from "@testing-library/react";

import Header from "./Header";

describe("<Item />", () => {
  const mockedCategories = ["Computación", "Laptops y Accesorios"];
  const clearStore = jest.fn();
  const setValue = jest.fn();
  const navigate = jest.fn();

  it("should render Header as expected", () => {
    const { container } = render(
      <Header
        categories={mockedCategories}
        clearStore={clearStore}
        value="lenovo"
        setValue={setValue}
        navigate={navigate}
      />
    );

    expect(screen.getByTestId("logo-wrapper")).not.toBeNull();
    expect(container.querySelector("ul")).not.toBeNull();
    expect(container.querySelector("li")).not.toBeNull();
    expect(screen.getByDisplayValue("lenovo")).not.toBeNull();
    mockedCategories.map((text) =>
      expect(screen.getByText(text)).not.toBeNull()
    );
  });

  it("should call the expected functions on logo click", () => {
    render(
      <Header
        categories={mockedCategories}
        clearStore={clearStore}
        value="lenovo"
        setValue={setValue}
        navigate={navigate}
      />
    );

    const logo = screen.getByTestId("logo-wrapper");
    fireEvent.click(logo);

    expect(setValue).toHaveBeenCalledWith("");
    expect(clearStore).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("should call the expected functions on submit", () => {
    clearStore.mockClear();
    setValue.mockClear();
    navigate.mockClear();

    render(
      <Header
        categories={mockedCategories}
        clearStore={clearStore}
        value="lenovo"
        setValue={setValue}
        navigate={navigate}
      />
    );

    const input = screen.getByDisplayValue("lenovo");
    const form = screen.getByRole("form");

    fireEvent.change(input, { target: { value: "audi" } });
    fireEvent.submit(form);

    expect(setValue).toHaveBeenCalledWith("audi");
    expect(clearStore).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
