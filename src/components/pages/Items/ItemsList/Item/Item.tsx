import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { AiFillCheckCircle } from "react-icons/ai";
import Image from "next/image";

import { IItemComponent } from "./Item.types";
import { mapCurrency, mapCondition } from "~/utils";

const StyledLi = styled.li`
  display: flex;
  background-color: #ffff;
  border: 1px solid #ebebeb;
  border-radius: 2px;
  margin-bottom: 8px;
  padding: 4px;
  cursor: pointer;
`;

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0 0 8px;
`;

const Price = styled.span`
  display: flex;
  align-items: center;
  font-size: 24px;
  margin-bottom: 8px;
`;

const StyledIcon = styled(AiFillCheckCircle)`
  margin-left: 8px;
`;

const ItemComponent: React.FC<IItemComponent> = (props) => {
  const navigateToItem = props.navigateToItem;
  const item = props.item;

  function handleItemClick() {
    navigateToItem(`/items/${item.id}`);
  }

  return (
    <StyledLi onClick={handleItemClick}>
      <Image src={item.picture} alt="item-img" width={150} height={150} />
      <ItemDescription>
        <Price>
          {mapCurrency[item.price.currency]}{" "}
          {item.price.amount.toLocaleString("de-DE")}
          {item.free_shipping && (
            <div data-testid="free-shipping">
              <StyledIcon size={24} color="#4CAF50" />
            </div>
          )}
        </Price>
        {item.title} <br />
        {mapCondition[item.condition]}
      </ItemDescription>
    </StyledLi>
  );
};

export default observer(ItemComponent);
