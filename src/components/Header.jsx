// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Home</Navbar.Brand>
          </LinkContainer>
          {userInfo && userInfo.role === "client" && (<>
            <LinkContainer to="/get-guests" className="ms-5 me-5">
              <Navbar.Brand>Manage Guests</Navbar.Brand>
            </LinkContainer>
            <LinkContainer to="/vendor-selection" className="me-5">
              <Navbar.Brand>Vendor Selection</Navbar.Brand>
            </LinkContainer>
            <LinkContainer to="/client-dashboard">
              <Navbar.Brand>Client Dashboard</Navbar.Brand>
            </LinkContainer>
          </>)}
          {userInfo && userInfo.role === "vendor" && (<>
            <LinkContainer className="ms-5 me-5" to="/get-items">
              <Navbar.Brand>Inventory</Navbar.Brand>
            </LinkContainer>
            <LinkContainer to="/get-display-items">
              <Navbar.Brand>Manage Display</Navbar.Brand>
            </LinkContainer>
          </>)}
          {userInfo && userInfo.role === "admin" && (<>
            <LinkContainer className="ms-5 me-5" to="/manage-users">
              <Navbar.Brand>Manage Users</Navbar.Brand>
            </LinkContainer>
          </>)}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown
                    title={`${userInfo.name} (${userInfo.role})`}
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
