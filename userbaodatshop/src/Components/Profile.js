import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    Avatar,
    Box,
    Menu,
    Button,
    IconButton,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';	
import { IconListCheck, IconMail, IconUser } from '@tabler/icons';

import ProfileImg from '../Assets/images/AoBarca2023.png';

const Profile = () => {
    const [anchorEl2, setAnchorEl2] = useState(null);
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const history = useNavigate()
    const handleSignOut = () => {
        localStorage.clear();
        history("/")
    };
    return (
        <Box>
            <IconButton
                size="large"
                aria-label="show 11 new notifications"
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
                sx={{
                    ...(typeof anchorEl2 === 'object' && {
                        color: 'primary.main',
                    }),
                }}
                onClick={handleClick2}
            >
                <Avatar
                    src={ProfileImg}
                    alt={ProfileImg}
                    sx={{
                        width: 50,
                        height: 50,
                    }}
                />
            </IconButton>
            {/* ------------------------------------------- */}
            {/* Message Dropdown */}
            {/* ------------------------------------------- */}
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '200px',
                    },
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <IconUser width={20} />
                    </ListItemIcon>
                    <ListItemText>Thông tin tài khoản</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <IconMail width={20} />
                    </ListItemIcon>
                 
                    <ListItemText onClick={()=>history("/account")}> Đơn hàng </ListItemText>
                   
                    
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <IconListCheck width={20} />
                    </ListItemIcon>
                    <ListItemText>My Tasks</ListItemText>
                </MenuItem>
                <Box mt={1} py={1} px={2}>
                    <Button to="/" variant="outlined" color="primary" component={Link} fullWidth onClick={handleSignOut}>
                        Logout
                    </Button>
                </Box>
            </Menu>
        </Box>
    );
};

export default Profile;
