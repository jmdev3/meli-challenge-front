import Item from "~/components/pages/Item";
import Api from "~/services/api";

/**
 * pre-render data en server-side, no solo optmización de performance sino SEO
 * https://nextjs.org/docs/basic-features/pages#pre-rendering
 * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
export async function getServerSideProps(context) {
  const { itemId } = context.query;
  let data = {};

  try {
    data = await Api.getItem(itemId);
  } catch (error) {
    console.log("> getServerSideProps item error: ", error);
  }

  return {
    props: {
      data,
    },
  };
}

export default Item;
