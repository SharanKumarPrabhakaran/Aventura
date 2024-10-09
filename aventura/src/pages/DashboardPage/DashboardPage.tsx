import React, {useEffect} from 'react';
import {Container} from '@mui/material';
import AdminDashboard from '../../components/Admin/AdminDashboard';
import Navigation from '../../components/Navbar/Navigation';
import Footer from '../../components/Footer/Footer';
import HeroSection from '../../components/HeroSection/HeroSection';
import HeroImage from '../../assets/hero_image.avif';
import {useTranslation} from "react-i18next";
import i18n from "../../i18n.ts";

const Dashboard: React.FC = () => {
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
                imageUrl={HeroImage}
                title={"Admin Dashboard"}
            />
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <AdminDashboard/>
            </Container>
            <Footer/>
        </>
    );
};

export default Dashboard;
