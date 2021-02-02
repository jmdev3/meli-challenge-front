import Item from "~/components/pages/Item";
import Api from "~/services/api";

export async function getServerSideProps(context) {
  const { itemId } = context.query;
  const response = await Api.getItem(itemId);

  return {
    props: {
      ...response.data,
    },
  };
}

export default Item;
