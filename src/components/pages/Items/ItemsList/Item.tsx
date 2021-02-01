import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useRouter } from "next/router";

import { IItem } from "~/stores/mainStore";

interface IItemComponent {
  item: IItem;
}

const mapCurrency = {
  USD: "U$D",
  ARS: "$",
};

const mapCondition = {
  new: "Nuevo",
  used: "Usado",
};

const StyledLi = styled.li`
  display: flex;
  background-color: #ffff;
  border: 1px solid #ebebeb;
  border-radius: 2px;
  margin-bottom: 8px;
  padding: 4px;
  cursor: pointer;
`;

const StyledImg = styled.img`
  width: 150px;
  height: 150px;
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
  const router = useRouter();
  const item = props.item;

  function handleItemClick() {
    router.push(`/items/${item.id}`, undefined, { shallow: true });
  }

  return (
    <StyledLi onClick={handleItemClick}>
      <StyledImg src={item.picture} alt="item-img" />
      <ItemDescription>
        <Price>
          {mapCurrency[item.price.currency]} {item.price.amount}
          {item.free_shipping && <StyledIcon size={24} color="#4CAF50" />}
        </Price>
        {item.title} <br />
        {mapCondition[item.condition]}
      </ItemDescription>
    </StyledLi>
  );
};

export default observer(ItemComponent);
