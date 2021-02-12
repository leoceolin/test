import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoFarmContainer = styled.div`
  width: 45%;
  padding: 10px;

  text {
    font-weight: bold;
    font-size: 20px;
    text-decoration: underline;
  }

  div.externalDiv {
    width: 270px;
    height: 220px;
    border: 1px solid black;
  }

  div.internalDiv {
    margin-top: 20px;
    width: 270px;
    height: 220px;
    border: 1px solid blue;

    .infoText {
      padding: 5px;
      font-weight: bold;

      .price {
        text-decoration: underline;
      }
    }
  }

  div.buttons {
    display: flex;
    flex-direction: row;
    padding: 5px;

    .button {
      margin: 10px 10px 0 0;
      width: 80px;
      height: 20px;
      border: 1px solid blue;
      text-align: start;
      align-content: center;
      justify-content: center;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
