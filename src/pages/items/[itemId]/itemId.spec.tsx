import { getServerSideProps } from "./index";

jest.mock("~/services/api", () => ({
  getItem: jest.fn().mockReturnValue({
    item: {
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
    },
    categories: ["Computación", "Laptops y Accesorios"],
    author: {
      name: "Juan Manuel",
      lastname: "Villarraza",
    },
  }),
}));

describe("getServerSideProps", () => {
  it("should work as expected", async () => {
    const pageProps = await getServerSideProps({ query: { itemId: "1234" } });

    expect(pageProps).toStrictEqual({
      props: {
        data: {
          item: {
            id: "item-id",
            title: "lenovo",
            price: {
              currency: "ARS",
              amount: 1000,
              decimals: 2,
            },
            picture:
              "http://http2.mlstatic.com/D_961352-MLA42764591253_072020-O.jpg",
            condition: "new",
            free_shipping: true,
          },
          categories: ["Computación", "Laptops y Accesorios"],
          author: {
            name: "Juan Manuel",
            lastname: "Villarraza",
          },
        },
      },
    });
  });
});
