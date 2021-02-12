import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header";
import MapView from "../../components/Map";
import { Container, InfoFarmContainer, Content } from "./styles";
import { getAll } from "../../farms";

const Home = props => {
  const { history } = props;
  const [selectedFarm, setSelected] = useState({});
  const [farms, setAllFarms] = useState([]);
  const [total, setTotal] = useState(null);

  const calcTotal = (area, yieldParam) => {
    const auxTotal = area * yieldParam;
    if (isNaN(total) !== false) {
      setTotal(auxTotal);
    }
  };

  const changeFarm = farmParam => {
    setSelected(farmParam);
    calcTotal(farmParam.total_area, farmParam.yield_estimation);
  };

  const goToFarm = async () => {
    history.push({
      pathname: "/app/farm",
      params: { total: total, selectedFarm: selectedFarm }
    });
  };

  useEffect(() => {
    async function getFarms() {
      const { allFarms } = await getAll();

      setAllFarms(allFarms);
      setSelected(allFarms[0]);

      calcTotal(selectedFarm.total_area, selectedFarm.yield_estimation);
    }
    getFarms();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <MapView selectedFarm={selectedFarm} />
        <InfoFarmContainer>
          <div className="textClass">Farm</div>
          <div>
            <input className="searchbar" placeholder="SEARCH BAR"></input>
          </div>

          <div className="externalDiv">
            {farms.map(farm => {
              return (
                <div
                  onClick={() => {
                    changeFarm(farm);
                  }}
                  key={farm.farm_id}
                  className="internalDiv"
                >
                  <div className="infoText">
                    <div>Farm: {farm.name}</div>
                    <div>
                      Culture:
                      {farm.culture !== undefined ? farm.culture : " empty"}
                    </div>
                    <div>Variety: {farm.variety}</div>
                    <div>Area: {farm.total_area}</div>
                    <div>Yield estimation: {farm.yield_estimation}</div>
                    <div>
                      Total: {total !== null ? total : " invalid value"}
                    </div>
                    <div>
                      Price: <text className="price">{farm.price}</text>
                    </div>
                  </div>

                  <div className="buttons">
                    <div
                      onClick={() => {
                        goToFarm();
                      }}
                      className="button"
                    >
                      Buy now
                    </div>
                    <div
                      onClick={() => {
                        goToFarm();
                      }}
                      className="button"
                    >
                      Bid
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </InfoFarmContainer>
      </Content>
    </Container>
  );
};

Home.propTypes = {
  history: PropTypes.object
};

export default withRouter(Home);
