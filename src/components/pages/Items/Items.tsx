import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import ContentLoader from "react-content-loader";

import ItemsList from "./ItemsList";
import { IItems } from "./Items.types";
import NotFound from "~/components/shared/NotFound";

const Wrapper = styled.div`
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
    return (
      <Wrapper data-testid="skeleton-wrapper">
        {[1, 2, 3, 4].map((i) => (
          <ContentLoader speed={2} width={730} height={160} key={i}>
            <circle cx="75" cy="75" r="75" />
            <rect x="180" y="20" rx="3" ry="3" width="150" height="6" />
            <rect x="180" y="60" rx="3" ry="3" width="400" height="6" />
            <rect x="180" y="90" rx="3" ry="3" width="100" height="6" />
          </ContentLoader>
        ))}
      </Wrapper>
    );
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
