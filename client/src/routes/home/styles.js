import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoFarmContainer = styled.div`
  width: 45%;
  padding: 10px;

  div.textClass {
    font-weight: bold;
    font-size: 20px;
    text-decoration: underline;
  }

  input.searchbar {
    margin-top: 10px;
    width: 300px;
    height: 30px;
    border: 1px solid black;
  }

  div.externalDiv {
    margin-top: 10px;
    width: 300px;
    height: 440px;
    border: 1px solid black;
    overflow: scroll;
  }

  div.externalDiv::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: transparent;
  }

  div.externalDiv::-webkit-scrollbar {
    width: 6px;
    background-color: #ccc;
  }

  div.externalDiv::-webkit-scrollbar-thumb {
    background-color: #f2f2f2;
  }

  div.internalDiv {
    margin: 5px;

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

    .buttons {
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
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
