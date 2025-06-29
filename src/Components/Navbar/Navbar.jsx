import React, { useState } from 'react'
import {DarkModeOutlined, LightModeOutlined ,Menu as MenuIcon , Search,SettingsOutlined,ArrowDropDownOutlined} from '@mui/icons-material'
import { setTheme } from '../../redux/Slices/theme.slice'
import { useDispatch } from 'react-redux'
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material'
import FlexBetween from '../FlexBetween/Flexbetween'
import profile from "../../assets/profile.jpeg"



const Navbar = ({isSidebarOpen,setIsSidebarOpen,user}) => {
    const dispatch=useDispatch()
     const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    const theme=useTheme()
  return (
    <AppBar sx={{background:"none",boxShadow:"none",position:"static"}} >

    <Toolbar sx={{justifyContent:"space-between"}}>

        {/* LEFT SIDE */}

        <FlexBetween>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={()=>setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon />
          </IconButton>
            <FlexBetween
                backgroundColor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                padding="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..." ></InputBase>
                    <IconButton>
                        <Search/>
                    </IconButton>
            </FlexBetween>
        </FlexBetween>
        {/* RIGHT SIDE */}
        <FlexBetween gap="2rem">
            <IconButton onClick={()=>dispatch(setTheme())}>
                {theme.palette.mode==="dark" ? <LightModeOutlined sx={{fontSize:"25px"}}  /> : <DarkModeOutlined  sx={{fontSize:"25px"}}  />}
            </IconButton>
            <IconButton>
                <SettingsOutlined/>
            </IconButton>
            <FlexBetween>
              <Button onClick={handleClick} sx={{display:"flex",alignItems:"center",gap:"0.5rem",textTransform:"none"}}> 
                <Box
                component="img"
                alt="profile"
                src={profile}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{objectFit:"cover"}}
                />
                <Box textAlign="left">

                  <Typography fontSize="0.85rem" fontWeight="bold" color={theme.palette.secondary[100]}>{user.name}</Typography>
                  <Typography fontSize="0.75rem" color={theme.palette.grey[500]}>{user.occupation}</Typography>

                
                </Box>
                <ArrowDropDownOutlined sx={{color:theme.palette.secondary[300],fontSize:"25px"}}/>
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}

              >    
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
              </Menu>
            </FlexBetween>
        </FlexBetween>
    </Toolbar>

    </AppBar>
  )
}

export default Navbar