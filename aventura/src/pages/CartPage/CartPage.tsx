import React, {useEffect} from 'react';
import {Box, Grid} from '@mui/material';
import Cart from '../../components/CartView/CartView';
import AddressForm from '../../components/AddressForm/AddressForm';
import './CartPage.scss';
import Navigation from '../../components/Navbar/Navigation';
import HeroSection from '../../components/HeroSection/HeroSection';
import backgroundImage from '../../assets/images/shoppingcart.jpg';
import Footer from '../../components/Footer/Footer';
import {useTranslation} from "react-i18next";
import i18n from "../../i18n.ts";

const CartPage = () => {
    const [language, setLanguage] = React.useState({
        checked: true,
    });

    // Declaring t variable for translation

    const translate = () => {
        console.log("checked", language.checked);
        setLanguage({
            checked: !language.checked,
        });
    };

    useEffect(() => {
        if (language.checked) {
            i18n.changeLanguage("en").then(() => console.log("changed to en"));
        } else {
            i18n.changeLanguage("ta").then(() => console.log("changed to ta"));
        }
    }, [language]);
    return (
        <>
            <Navigation translatePage={translate}/>
            <HeroSection
                searchTerm={''}
                setSearchTerm={(String)}
                showSearch={false}
                imageUrl={backgroundImage}
                title={"Your adventure begins with a single step. Every item in your cart brings you closer to a journey worth taking."}
            />
            <Box className="cart-page">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} className="payment-container">
                        <AddressForm/>
                    </Grid>
                    <Grid item xs={12} md={6} className="full-height-cart">
                        <Cart/>
                    </Grid>
                </Grid>
            </Box>
            <Footer/>
        </>

    );
};

export default CartPage;
