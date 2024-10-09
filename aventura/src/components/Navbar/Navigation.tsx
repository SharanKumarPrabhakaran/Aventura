import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Badge,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Modal,
    SwipeableDrawer,
    Tab,
    Tabs,
    Toolbar,
    Typography
} from '@mui/material';
import {assets} from '../../services/assets.ts';
import Header from '../Header/Header';
import AuthForm from "../Auth/AuthForm.tsx";
import SignUpForm from "../Auth/SignUpForm.tsx";
import {useNavigate} from "react-router-dom";
import {t} from 'i18next';
import {useDispatch, useSelector} from "react-redux";
import UserProfileModal from "../UserProfile/UserProfileModal.tsx";
import {deleteUser} from "../../store/slices/user-slice.ts";
import {RootState} from "../../store";

interface NavigationProps {
    translatePage: () => void;
}

const Navigation: React.FC<NavigationProps> = ({translatePage}) => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Check if user is admin
    const [value, setValue] = useState(false); // Changed to number for Tabs value
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const user = useSelector((state: RootState) => state.user);
    const cartItems = useSelector((state: RootState) => state.cart.items); // Get cart items from the state
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total items


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginPopUp, setIsLoginPopUp] = useState(false);
    const [isSignUpPopUp, setIsSignUpPopUp] = useState(false);
    const [isProfilePopUp, setIsProfilePopUp] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.isLoggedIn) {
            localStorage.setItem("user", JSON.stringify(user));
            setIsLogged(true);
        }
    //     set active navigation according to the current page url
        if (window.location.pathname === '/packages') {
            setValue(0);
        } else if (window.location.pathname === '/products') {
            setValue(1);
        } else if (window.location.pathname === '/blogs') {
            setValue(2);
        }
    }, [user.isLoggedIn]); // Add dependency array to only run on user.isLoggedIn change

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setIsHeaderVisible(false);
    };

    const onHomeClick = () => {
        navigate('/');
    }

    const handleLoginSuccess = () => {
        setIsLogged(true);
        setIsModalOpen(false);
    };

    const onUserAccountClick = () => {
        setIsModalOpen(true);
        setIsProfilePopUp(true);
    }

    const onMyOrdersClick = () => {
        navigate('/my-orders');
    }

    const onLoginClick = () => {
        setIsModalOpen(true);
        setIsLoginPopUp(true);
    }

    const togglepages = () => {
        setIsLoginPopUp(!isLoginPopUp);
        setIsSignUpPopUp(!isSignUpPopUp);
    }

    const closeModel = () => {
        setIsModalOpen(false);
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const drawerContent = (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button onClick={() => navigate('/packages')}>
                    <ListItemText primary={t('packages')}/>
                </ListItem>
                <ListItem button onClick={() => navigate('/products')}>
                    <ListItemText primary={t('shop')}/>
                </ListItem>
                <ListItem button onClick={() => navigate('/blogs')}>
                    <ListItemText primary={t('blogs')}/>
                </ListItem>
                <ListItem button onClick={translatePage}>
                    <ListItemText primary={t('Translate')}/>
                </ListItem>
                {isLogged && (
                    <ListItem button onClick={() => navigate('/cart')}>
                        <ListItemText primary={t('cart')}/>
                    </ListItem>
                )}
                {!isLogged ? (
                    <ListItem button onClick={onLoginClick}>
                        <ListItemText primary={t('login')}/>
                    </ListItem>
                ) : (
                    <>
                        <ListItem button onClick={onUserAccountClick}>
                            <ListItemText primary={t('user_account')}/>
                        </ListItem>
                        <ListItem button onClick={onMyOrdersClick}>
                            <ListItemText primary={t('my_orders')}/>
                        </ListItem>
                        <ListItem button onClick={() => {
                            setIsLogged(false);
                            dispatch(deleteUser());
                            setIsProfilePopUp(false);
                            localStorage.removeItem('user');
                        }}>
                            <ListItemText primary={t('Logout')}/>
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <>
            {isHeaderVisible && <Header onClose={handleClose}/>}
            <AppBar position="absolute" sx={{
                bgcolor: 'transparent',
                boxShadow: 'none',
                borderBottom: '1px solid white',
                mt: isHeaderVisible ? '60px' : '0px'
            }}>
                <Toolbar sx={{margin: '10px'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1}} onClick={onHomeClick}>
                        <img src={assets.logo} width="60px" alt="Aventura Logo"/>
                        <Typography variant="h5" sx={{ml: 1, fontWeight: 'bold'}}>
                            {t("aventura")}
                        </Typography>
                    </Box>
                    <Box sx={{display: {xs: 'none', md: 'flex'}, width: '100%', justifyContent: 'center'}}>
                        <Tabs value={value} onChange={handleChange} centered sx={{
                            '& .MuiTab-root': {color: 'white'},
                            '& .MuiTabs-indicator': {backgroundColor: 'white'}
                        }}>
                            <Tab label={t("packages")} onClick={() => navigate('/packages')}/>
                            <Tab label={t("shop")} onClick={() => navigate('/products')}/>
                            <Tab label={t("blogs")} onClick={() => navigate('/blogs')}/>
                            {isAdmin && <Tab label={t("Dashboard")} onClick={() => navigate('/dashboard')}/>}
                        </Tabs>
                    </Box>
                    <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 2, ml: 2}}>
                        {isLogged && (
                            <IconButton color="inherit" onClick={() => navigate('/cart')}>
                                <Badge
                                    badgeContent={totalItemsInCart} color="primary">
                                    <img src={assets.bag} alt="cart" style={{width: '30px', height: '30px'}}/>
                                </Badge>
                            </IconButton>
                        )}
                        <IconButton color="inherit" onClick={translatePage}>
                            <img src={assets.language_change} alt="language" style={{width: '30px', height: '30px'}}/>
                        </IconButton>
                        {!isLogged ? (
                            <IconButton color="inherit" onClick={onLoginClick}>
                                <img src={assets.user_profile} alt="user profile"
                                     style={{width: '30px', height: '30px'}}/>
                            </IconButton>
                        ) : (
                            <>
                                <IconButton color="inherit" onClick={handleClick}>
                                    <img src={assets.user_profile} alt="user profile"
                                         style={{width: '30px', height: '30px'}}/>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                >
                                    <MenuItem onClick={onUserAccountClick}>{t("user_account")}</MenuItem>
                                    <MenuItem onClick={() => navigate('/my-bookings')}>My
                                        Bookings</MenuItem> {/* Add this */}
                                    <MenuItem onClick={() => {
                                        setIsLogged(false);
                                        dispatch(deleteUser());
                                        handleCloseMenu();
                                        setIsProfilePopUp(false);
                                        localStorage.removeItem('user');
                                    }}>{t("Logout")}</MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{display: {xs: 'block', md: 'none'}}}
                    >
                        <img src={assets.menu} width="30px" height="30px" alt="Menu"/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                sx={{
                    display: {xs: 'block', md: 'none'},
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 250,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        color: 'white'
                    },
                }}
            >
                {drawerContent}
            </SwipeableDrawer>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                {isProfilePopUp ? (
                    <UserProfileModal open={isModalOpen} closeModel={closeModel}/>
                ) : isLoginPopUp ? (
                    <AuthForm
                        navigateToSignUp={togglepages}
                        onLoginSuccess={handleLoginSuccess}
                        closeModel={closeModel}
                    />
                ) : (
                    <SignUpForm
                        navigateToLogin={togglepages}
                        closeModel={closeModel}
                    />
                )}
            </Modal>
        </>
    );
}

export default Navigation;