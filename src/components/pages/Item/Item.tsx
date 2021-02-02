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

const ItemInfo = styled.div``;

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
              width={500}
              height={500}
            />
            <ItemInfo>
              <p>{mapCondition[selectedItem.condition]}</p>
              <p>{selectedItem.title}</p>
              <p>
                {mapCurrency[selectedItem.price.currency]}&nbsp;
                {selectedItem.price.amount}
              </p>
            </ItemInfo>
          </ImageInfoWrapper>
          <h2>Descripción del producto</h2>
          <p>{selectedItem.description}</p>
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default observer(Item);
