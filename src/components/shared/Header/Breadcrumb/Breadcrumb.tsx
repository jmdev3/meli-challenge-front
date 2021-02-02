import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";

import { IBreadcrumb, IStyledLi } from "./Breadcrumb.types";

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ebebeb;
  padding-top: 16px;
`;

const StyledUl = styled.ul`
  width: 762px;
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledLi = styled.li<IStyledLi>`
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;

  ${(props) =>
    props.first &&
    `
    ::before {
      content: "|";
      padding: 0 12px;
    }
  `}
`;

const Breadcrumb: React.FC<IBreadcrumb> = (props) => {
  return (
    <InnerWrapper>
      <StyledUl>
        {props.categories.map((categorie, index) => {
          return (
            <StyledLi key={index} first={index !== 0}>
              {categorie}
            </StyledLi>
          );
        })}
      </StyledUl>
    </InnerWrapper>
  );
};

export default observer(Breadcrumb);
