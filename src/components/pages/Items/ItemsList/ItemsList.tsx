import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

import { IItemsList } from "./ItemsList.types";
import Item from "./Item";

const StyledUl = styled.ul`
  background-color: #ffff;
  width: 750px;
  height: fit-content;
  list-style-type: none;
  margin: 0;
  padding: 8px;
`;

const ItemsList: React.FC<IItemsList> = (props) => {
  const router = useRouter();

  function navigateToItem(url: string) {
    router.push(url, undefined, { shallow: true });
  }

  return (
    <StyledUl>
      {props.items.map((item) => (
        <Item item={item} key={item.id} navigateToItem={navigateToItem} />
      ))}
    </StyledUl>
  );
};

export default observer(ItemsList);
