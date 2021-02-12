import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header";
import { Container, Title } from "./styles";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { getAll } from "../../farms";

const Config = () => {
  const [farms, setAllFarms] = useState([]);
  useEffect(async () => {
    setAllFarms([]);
    const { allFarms } = await getAll();
    setAllFarms(allFarms);
  }, []);

  return (
    <Container>
      <Header />
      <Title>CONFIGURATIONS</Title>

      <div>
        <table>
          <tr>
            <th>Farm </th>
            <th> Culture </th>
            <th> Variety</th>
            <th> Total area </th>
            <th> Yield estimation </th>
            <th> Price</th>
            <th>Action</th>
          </tr>
          {farms.length > 0 &&
            farms.map(farm => {
              return (
                <tr key={farm.farm_id}>
                  <td>{farm.name}</td>
                  <td>{farm.culture}</td>
                  <td>{farm.variety}</td>
                  <td>{farm.total_area}</td>
                  <td>{farm.yield_estimation}</td>
                  <td>{farm.price}</td>
                  <td>
                    <MdModeEdit />
                    <MdDelete />
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </Container>
  );
};

export default withRouter(Config);
