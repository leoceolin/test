import React from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header";
import MapView from "../../components/Map";
import { Container, InfoFarmContainer, Content } from "./styles";

const Farm = props => {
  const { location } = props;
  const { selectedFarm, total } = location.params;

  return (
    <Container>
      <Header />
      <Content>
        <MapView selectedFarm={selectedFarm} />
        <InfoFarmContainer>
          <div className="externalDiv"></div>
          <div className="internalDiv">
            <div className="infoText">
              <div>Farm: {selectedFarm.name}</div>
              <div>
                Culture:
                {selectedFarm.culture !== undefined
                  ? selectedFarm.culture
                  : " empty"}
              </div>
              <div>Variety: {selectedFarm.variety}</div>
              <div>Area: {selectedFarm.total_area}</div>
              <div>Yield estimation: {selectedFarm.yield_estimation}</div>
              <div>Total: {total !== null ? total : " invalid value"}</div>
              <div>
                Price: <text className="price">{selectedFarm.price}</text>
              </div>
            </div>
          </div>

          <div className="buttons">
            <div className="button">Buy now</div>
            <div className="button">Bid</div>
          </div>
        </InfoFarmContainer>
      </Content>
    </Container>
  );
};

Farm.propTypes = {
  location: PropTypes.object
};

export default withRouter(Farm);
