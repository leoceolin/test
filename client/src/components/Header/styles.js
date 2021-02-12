import styled from "styled-components";

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  margin-top: 10px;
`;

export const Content = styled.div`
  height: 80px;
  max-width: 1400px;
  margin: 0 auto;
  align-items: center;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-width: 1px;
    border-left-width: 1px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-color: #3485c7;
    border-style: solid;

    img {
      margin-left: 30px;
      padding-right: 20px;
      width: 70px;
    }

    div {
      display: flex;
      justify-content: flex-end;
      font-size: 40px;
    }

    div.login {
      margin-right: 20px;
    }
  }
`;
