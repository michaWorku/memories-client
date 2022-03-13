import { FC, useState, useEffect } from "react";
import decode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  getProfile,
  logoutUserActionCreator,
  setUserActionCreator,
} from "../../features/auth/authSlice";
import {
  toggleSignUpActionCreator,
  toggleSignInActionCreator,
} from "../../features/auth/signupModeSlice"

import { clearMemoriesActionCreator } from "../../features/memory/memorySlice";
import { clearFavoritesActionCreator } from "../../features/favorites/favoritesSlice";
import { clearCategoriesActionCreator } from "../../features/category/categorySlice";
import { clearCurrentMemoryActionCreator } from "../../features/memory/currentMemorySlice";
import { setCurrentCategoryActionCreator } from "../../features/category/selectedCategorySlice";
import { toggleCreateModeActionCreator } from "../../features/edit/enditModeSlice";
import { showDrawerActionCreator } from "../../features/drawer/drawerSlice";
import { setLastChangedMemoryActionCreator } from "../../features/memory/lastChangedMemorySlice";

import { setPageActionCreator } from "../../features/page/pageSlice";

import {
  AppBar,
  Menu,
  MenuItem,
  Avatar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Hidden,
  Divider,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import GradeIcon from "@mui/icons-material/Grade";
import CategoryIcon from "@mui/icons-material/Category";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import useStyles from "./styles";
import { Link } from "react-router-dom";

import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import Sidebar from "../Sidebar/Sidebar";

const Navbar: FC = () => {
  const profile = useAppSelector((state) => state.profile);
  const selectedCategory = useAppSelector( (state) => state.selectedCategory );
  const isDrawer = useAppSelector((state) => state.isDrawer);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const token = profile?.token;

      if (token) {
        const decoded: any = decode(token);

        // Logout user if his token has expired
        if (decoded.exp * 1000 < new Date().getTime()) return logout();

        await dispatch(getProfile(null));
        dispatch(setUserActionCreator());
      }

      dispatch(setLastChangedMemoryActionCreator(""));
    })();
  }, [location]);

  const handleMenu = (e: any) => setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const logout = () => {
    localStorage.removeItem("profile");
    dispatch(clearMemoriesActionCreator());
    dispatch(clearFavoritesActionCreator());
    dispatch(clearCategoriesActionCreator());
    dispatch(setCurrentCategoryActionCreator("all"));
    dispatch(setLastChangedMemoryActionCreator(""));
    dispatch(clearCurrentMemoryActionCreator());
    dispatch(toggleCreateModeActionCreator());
    dispatch(setPageActionCreator(1));
    dispatch(logoutUserActionCreator());
    navigate("/");
  };

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.image}>
          <img src={memoriesText} alt="icon" height="45px" />
          <img
            className={classes.image}
            src={memoriesLogo}
            alt="icon"
            height="40px"
          />
        </Link>
        <Toolbar>
          {profile?.token ? (
            <>
              <Typography className={classes.userName} variant="h5">
                {profile?.user?.firstName}
              </Typography>
              <IconButton aria-label="menu" onClick={handleMenu}>
                <Avatar className={classes.avatar}>
                  <Typography
                    className={classes.avatarLetter}
                    variant="subtitle1"
                  >
                    {profile?.user?.firstName.charAt(0)}
                  </Typography>
                </Avatar>
              </IconButton>

              <Menu
                className={classes.menu}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    dispatch(setLastChangedMemoryActionCreator(""));
                    navigate("/posts");
                  }}
                >
                  <PhotoLibraryIcon />
                  Memories
                </MenuItem>
                <MenuItem
                  disabled={selectedCategory !== "all"}
                  onClick={() => {
                    handleClose();
                    dispatch(clearCurrentMemoryActionCreator());
                    dispatch(toggleCreateModeActionCreator());
                    // Reset category to display all favorite memories
                    // and not only from particular category (fixed bug)
                    dispatch(setCurrentCategoryActionCreator("all"));
                    dispatch(setLastChangedMemoryActionCreator(""));
                    navigate("/favorites");
                  }}
                >
                  <GradeIcon />
                  Favorites
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    dispatch(showDrawerActionCreator());
                  }}
                >
                  <CategoryIcon />
                  Categories
                </MenuItem>
                <Divider style={{ marginBottom: "0.5rem" }} />
                <MenuItem
                  onClick={() => {
                    logout();
                    handleClose();
                  }}
                >
                  <PowerSettingsNewIcon />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div className={classes.buttonsContainer}>
              <Hidden xsDown>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    dispatch(toggleSignInActionCreator());
                    navigate("/auth");
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    dispatch(toggleSignUpActionCreator());
                    navigate("/auth");
                  }}
                >
                  Sign Up
                </Button>
              </Hidden>
              <Hidden smUp>
                <IconButton
                  className={classes.hamburgerIcon}
                  edge="end"
                  color="secondary"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      dispatch(toggleSignInActionCreator());
                      handleClose();
                      navigate("/auth");
                    }}
                  >
                    Sign In
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      dispatch(toggleSignUpActionCreator());
                      handleClose();
                      navigate("/auth");
                    }}
                  >
                    Sign Up
                  </MenuItem>
                </Menu>
              </Hidden>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {isDrawer && <Sidebar />}
    </>
  );
};

export default Navbar;
