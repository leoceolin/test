import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  div {
    justify-content: center;
    align-items: center;
  }

  table {
    width: 100%;
    margin-top: 50px;
  }

  table tr {
    text-align: center;
  }

  table td {
    text-align: center;
  }
`;

export const Title = styled.text`
  display: flex;
  justify-content: center;
  font-size: 35px;
`;
