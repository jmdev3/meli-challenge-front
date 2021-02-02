import Item from "~/components/pages/Item";
import Api from "~/services/api";
import { get } from "lodash";

/**
 * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
export async function getServerSideProps(context) {
  const { itemId } = context.query;
  let response;

  try {
    response = await Api.getItem(itemId);
  } catch (error) {
    console.log("> getServerSideProps item error: ", error);
  }

  return {
    props: {
      data: get(response, "data", {}),
    },
  };
}

export default Item;
