import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";

import ItemsList from "./ItemsList";
import { IItems } from "./Items.types";
import NotFound from "~/components/shared/NotFound";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 750px;
  padding: 24px 8px;
  background-color: #fff;
  border-radius: 4px;
`;

const Items: React.FC<IItems> = (props) => {
  const isValidating = props.isValidating;
  const hasFoundItems = props.hasFoundItems;
  const items = props.items;

  if (isValidating) {
    return <Wrapper>Buscando...</Wrapper>;
  }

  if (hasFoundItems) {
    return (
      <NotFound text="No hay publicaciones que coincidan con tu búsqueda." />
    );
  }

  return (
    <React.Fragment>
      {items.length > 0 && <ItemsList items={items} />}
    </React.Fragment>
  );
};

export default observer(Items);
