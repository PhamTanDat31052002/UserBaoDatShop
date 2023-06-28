import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Profile from "./Profile";
import { useState } from 'react';
import { useEffect } from 'react';
import { variable } from "../Variable"

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const token = getToken();
  var [records, setRecords] = useState([]);
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [CountCart, setCountCart] = React.useState(0);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  var [dem,setDem]=useState(0);
  useEffect(() => {
    const token = getToken();
    if (token != null) {
      fetch(variable.API_URL + "Carts/GetAllCart", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token.value}`,
        }
      }).then(response => response.json())
        .then(data => {
          // setDem(dem+1)
          setRecords(data)
          var a=0
          data.forEach(element => {
            a=a+1
          })
          setCountCart(a)
        }).catch(err => console.log(err))

    }
  }, [])
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Thông tin cá nhân</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu

      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );
  //search
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const products = ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'];

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    const filteredSuggestions = products.filter((product) =>
      product.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setSuggestionsVisible(true);
  };


  return (


    <Box sx={{ flexGrow: 1 }}>
      <div class="fab-wrapper">
        <input id="fabCheckbox" type="checkbox" class="fab-checkbox"></input>
        <label class="fab" for="fabCheckbox">
          <i class="icon-cps-fab-menu"></i>
          {/* <!-- <i class="icon-cps-close"></i> --> */}
        </label>
        <div class="fab-wheel">
          <a className="fab-action fab-action-1" href="https://www.google.com/maps/place/638+L%C3%AA+Tr%E1%BB%8Dng+T%E1%BA%A5n,+B%C3%ACnh+H%C6%B0ng+Ho%C3%A0,+T%C3%A2n+Ph%C3%BA,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.8137324,106.6041641,17z/data=!3m1!4b1!4m6!3m5!1s0x31752beadc166d1b:0xfa60a6bb4dcd07a1!8m2!3d10.8137324!4d106.606739!16s%2Fg%2F11c5nwzjgz?hl=vi-VN&entry=ttu" target="_blank">
            <span class="fab-title">Tìm cửa hàng</span>
            <div class="fab-button fab-button-1"><i class="icon-cps-local"></i></div>
          </a>
          <a class="fab-action fab-action-2" href="tel:0362047571" rel="nofollow " target="_blank">
            <span class="fab-title">Gọi trực tiếp</span>
            <div class="fab-button fab-button-2"><i class="icon-cps-phone"></i></div>
          </a>
          <a class="fab-action fab-action-3" href="https://www.facebook.com/phamtandat2002" target="_blank" >
            <span class="fab-title">Chat ngay</span>
            <div class="fab-button fab-button-3"><i class="icon-cps-chat"></i></div>
          </a>
          <a class="fab-action fab-action-4" href="https://zalo.me/0362047571" target="_blank">
            <span class="fab-title">Chat trên Zalo</span>
            <div class="fab-button fab-button-4"><i class="icon-cps-chat-zalo"></i></div>
          </a>
        </div>
        <div class="suggestions-chat-box hidden" style={{ display: "none" }}>
          <div class="box-content d-flex justify-content-around align-items-center">
            <i class="fa fa-times-circle" aria-hidden="true" id="btnClose" onclick="jQuery('.suggestions-chat-box').hide()"></i>
            <p class="mb-0 font-14">Liên hệ ngay <i class="fa fa-hand-o-right" aria-hidden="true"></i></p>
          </div>
        </div>
        <div class="devvn_bg"></div>
      </div>
      <AppBar position="static">
        <Toolbar className='headerNew'>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >

            <MenuIcon />

          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <div className="logo " style={{ width: "25%" }}><NavLink to="/"><img src={require('../Assets/images/logo.png')} alt='' /></NavLink></div>
          </Typography>
          <Typography>
            <div className="itemHeader3">
              <div className="searchBody">
                <div className="search-box">
                  <button className="btn-search searchColor">
                    <i className="fas fa-search"></i>
                  </button>
                  <input
                    type="text"
                    className="input-search"
                    placeholder="Tìm kiếm"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                {searchTerm && suggestions.length > 0 && suggestionsVisible && (
                  <ul className="suggestions">
                    {suggestions.map((product, index) => (
                      <li key={index}>{product}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Typography>
            <NavLink to="/" className="nav-item nav-link itemTask" >Trang chủ</NavLink>
          </Typography>
          <Typography>
            <NavLink to="/product" className="nav-item nav-link itemTask" >Sản phẩm</NavLink>
          </Typography>
          <Typography>
            <NavLink to="/product" className="nav-item nav-link itemTask" >Bộ sưu tập</NavLink>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            {
              token == null ? null

                : <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={CountCart} color="error">
                    <NavLink to="/cart" className="fas fa-shopping-cart nav-item nav-link itemHeadernew" ></NavLink>
                  </Badge>
                </IconButton>
            }
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <Typography>
              {token == null ?
                <NavLink to="/login" className="far fa-user-circle nav-item nav-link itemAccountHD"
                  style={{ fontSize: "32px" }}></NavLink> :
                <div className="select-wrapper">
                  <div >
                    <ul className="ctnACHeader">
                      <li>

                        <Profile />
                      </li>

                    </ul>
                  </div>


                </div>

              }
            </Typography>
            {/* <IconButton
              className='iconAccountHeader'
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}





// <div className="itemHeader3">
//                                             <div className="searchBody">
//                                                 <div className="search-box ">
//                                                     <button className="btn-search"><i className="fas fa-search"></i></button>
//                                                     <input type="text" className="input-search" placeholder="Tìm kiếm" />
//                                                 </div>
//                                             </div>
//                                         </div>