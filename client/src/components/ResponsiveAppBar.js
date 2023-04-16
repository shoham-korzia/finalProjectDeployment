import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';

function ResponsiveAppBar() {
  const [logged,setLogged]= useState(false)
  useEffect(()=>{
    const logged = localStorage.getItem("user");
    if (logged){
      setLogged(true)
    }else{
      localStorage.removeItem("user") 
      setLogged(false)
    }
  },[])
  const logOut=()=>{
    localStorage.removeItem("user")
    setLogged(false)
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CatchingPokemonTwoToneIcon/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            {localStorage.getItem("user") && (
              <> 
               <MenuItem onClick={handleCloseNavMenu}>
              <Link className="myNavLinks" to='/result'>   <Typography>
              My Index
              </Typography></Link>
           
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link className="myNavLinks" to="/main">  <Typography>
                search
                </Typography></Link>
            
                </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
              <Link className="myNavLinks" to="/login">
            <Typography onClick={logOut}>
              Log Out
              </Typography>
              </Link>
              </MenuItem> 
              </>
        
            )}
             {!localStorage.getItem("user") && (
              <>
              <MenuItem>
              <Link className="myNavLinks" to="/home"> <Typography>
                Register
                </Typography></Link>
             
                </MenuItem>
                <MenuItem>
                <Link className="myNavLinks" to="/login">  <Typography>
                Login
                </Typography></Link>
            
                </MenuItem>
                
              </>
             )}
             
              
            </Menu>
          </Box>
          <CatchingPokemonTwoToneIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            POKEDEX
          </Typography>
          {!localStorage.getItem("user") && (
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link className="myNavLinks" to="/home">
               <Button 
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Register
              </Button>
              </Link>
              <Link className="myNavLinks" to="/login">
              <Button
                
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button >
              </Link>
              </Box>)}
              {localStorage.getItem("user") && (
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Link className="myNavLinks" to="/main">
                <Button 
                
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Search
              </Button>
              </Link>
              <Link className="myNavLinks" to='/result'> 
              <Button 
                
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                My Index
              </Button>
              </Link>
              <Link className="myNavLinks" to='/login'>
              <Button href="/Login" variant="contained"
                
                onClick={logOut}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Log Out
              </Button>
              </Link>
          </Box>)}

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
