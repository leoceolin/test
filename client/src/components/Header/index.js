import React from "react";
import { Container, Content } from "./styles";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import logo from "../../images/logo192.png";
import { MdBuild } from "react-icons/md";
// MdAdd

import { logout } from "../../auth";
const Header = props => {
  const { history } = props;
  const handleLogout = async () => {
    logout();
    history.push("/login");
  };

  const goToCRUD = async () => {
    history.push("/app/config");
  };

  const goToHome = async () => {
    history.push("/app/home");
  };
  return (
    <Container>
      <Content>
        <nav>
          <img onClick={goToHome} src={logo} alt="Gaivota logo" />
          <div>
            <div className="login" onClick={handleLogout}>
              LOGIN
            </div>
            <MdBuild onClick={goToCRUD} size={30} />
          </div>
        </nav>
      </Content>
    </Container>
  );
};

Header.propTypes = {
  history: PropTypes.object
};

export default withRouter(Header);
