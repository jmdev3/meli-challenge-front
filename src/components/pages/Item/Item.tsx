import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import Image from "next/image";

import { useMainStore } from "~/stores/mainStore";

const mapCurrency = {
  USD: "U$D",
  ARS: "$",
};

const mapCondition = {
  new: "Nuevo",
  used: "Usado",
};

const Wrapper = styled.div`
  width: 750px;
  height: fit-content;
  background-color: #fff;
  padding: 8px;
`;

const ImageInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ItemInfo = styled.div`
  width: 250px;
  margin-top: 24px;
  margin-left: 24px;

  & > p,
  & > h1,
  & > h4 {
    margin: 4px 0;
  }
`;

const Condition = styled.p`
  font-size: 14px;
`;

const Price = styled.h1`
  font-weight: 300;
`;

const Button = styled.button`
  height: 40px;
  width: 100%;
  margin-top: 16px;
  background-color: #3483fa;
  cursor: pointer;
  border-radius: 6px;
  border-color: transparent;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 0 24px;
  text-align: center;
  text-transform: capitalize;
`;

const Description = styled.div`
  width: 550px;
  margin-left: 24px;
`;

const StyledP = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`;

const Item: React.FC = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const store = useMainStore();
  const selectedItem = store.selectedItem;

  useEffect(() => {
    if (itemId) {
      store.getItemDetails(itemId as string);
    }
  }, [itemId]);

  return (
    <React.Fragment>
      {selectedItem && (
        <Wrapper>
          <ImageInfoWrapper>
            <Image
              src={selectedItem.picture}
              alt="item-img"
              width={450}
              height={450}
            />
            <ItemInfo>
              <Condition>{mapCondition[selectedItem.condition]}</Condition>
              <h4>{selectedItem.title}</h4>
              <Price>
                {mapCurrency[selectedItem.price.currency]}&nbsp;
                {selectedItem.price.amount.toLocaleString("de-DE")}
              </Price>
              <Button>comprar</Button>
            </ItemInfo>
          </ImageInfoWrapper>
          <Description>
            <h2>Descripción del producto</h2>
            <StyledP>{selectedItem.description}</StyledP>
          </Description>
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default observer(Item);
