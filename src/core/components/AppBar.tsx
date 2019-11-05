import React, { useRef, useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import AuthService from "shared/services/authService";

const ButtonSection = styled.section``;

const Holder = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > * {
    margin-right: 30px;
  }
`;

const StyledImg = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    cursor: "pointer"
  },
  menus: {
    fontSize: "16px",
    cursor: "pointer"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const handleLogin = useCallback(() => {
    AuthService.authenticateUsingGoogle();
  }, []);

  const [loggedInUser, setLoggedInUser] = useState<firebase.User | null>(null);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const buttonSectionRef = useRef(null);

  useEffect(() => {
    AuthService.onAuthStateChanged(user => {
      setLoggedInUser(user);
    });
  }, []);

  const toggleProfileMenu = useCallback(() => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }, [isProfileMenuOpen]);

  const handleLogout = useCallback(() => {
    AuthService.logout();
    toggleProfileMenu();
  }, [toggleProfileMenu]);

  return (
    <header className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to={{ pathname: `/` }}>Pawsome</Link>
          </Typography>
          <Holder>
            <Typography variant="h6" className={classes.menus}>
              <Link to={{ pathname: `/report/lost` }}>Report Lost</Link>
            </Typography>
            <Typography variant="h6" className={classes.menus}>
              <Link to={{ pathname: `/report/found` }}>Report Found</Link>
            </Typography>
          </Holder>
          <ButtonSection ref={buttonSectionRef}>
            {loggedInUser ? (
              loggedInUser.photoURL ? (
                <StyledImg
                  src={loggedInUser.photoURL}
                  onClick={toggleProfileMenu}
                />
              ) : (
                  <Button color="inherit" onClick={toggleProfileMenu}>
                    {loggedInUser.displayName}
                  </Button>
                )
            ) : (
                <Button color="inherit" onClick={handleLogin}>
                  Login
              </Button>
              )}

            <Menu
              id="menu-appbar"
              anchorEl={buttonSectionRef.current}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={isProfileMenuOpen}
              onClose={toggleProfileMenu}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </ButtonSection>
        </Toolbar>
      </AppBar>
    </header>
  );
}
