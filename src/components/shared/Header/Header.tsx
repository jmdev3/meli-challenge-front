import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import { observer } from "mobx-react";

import Breadcrumb from "./Breadcrumb";
import { IHeader } from "./Header.types";

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #fff159;
`;

const StyledForm = styled.form`
  position: relative;
  margin-left: 16px;
`;

const Input = styled.input`
  width: 630px;
  height: 36px;
  font-size: 16px;
  padding-left: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  border: 0 rgba(0, 0, 0, 0.2);
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 7px;
  right: 12px;
  cursor: pointer;
  padding-left: 12px;
  background: none;
  border: none;
  border-left: 1px solid #7e7e7e;
  outline: none;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
`;

const Header: React.FC<IHeader> = (props) => {
  const value = props.value;
  const setValue = props.setValue;
  const navigate = props.navigate;
  const categories = props.categories;
  const clearStore = props.clearStore;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (value) {
      clearStore();
      navigate(`/items?search=${value}`);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleLogoClick() {
    clearStore();
    setValue("");
    navigate("/");
  }

  return (
    <React.Fragment>
      <Wrapper>
        <LogoWrapper onClick={handleLogoClick} data-testid="logo-wrapper">
          <Image src="/logo.png" alt="Logo" width={134} height={34} />
        </LogoWrapper>
        <StyledForm onSubmit={handleSubmit} role="form">
          <Input
            value={value}
            onChange={handleInputChange}
            placeholder="Buscar productos, marcas y mas"
          />
          <IconWrapper as="button" type="submit">
            <AiOutlineSearch size={24} color="#7e7e7e" />
          </IconWrapper>
        </StyledForm>
      </Wrapper>
      {categories.length > 0 && <Breadcrumb categories={categories} />}
    </React.Fragment>
  );
};

export default observer(Header);
