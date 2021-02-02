import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";

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
  return (
    <StyledUl>
      {props.items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </StyledUl>
  );
};

export default observer(ItemsList);
