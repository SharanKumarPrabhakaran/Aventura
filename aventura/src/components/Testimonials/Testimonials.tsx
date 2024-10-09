import React from 'react';
import {Avatar, Box, Button, Rating, Typography} from '@mui/material';
import './Testimonials.css';
import {useNavigate} from "react-router-dom";
import {t} from "i18next";


const Testimonials = () => {

    const reviews = [
        {
            name: t("jessica"),
            destination: t("canadian"),
            review: t("content_1"),
            rating: 5,
            avatar: "./src/assets/authors/author-1.jpeg",
            link: ""
        },
        {
            name: t("john"),
            destination: t("lake"),
            review: t("content_2"),
            rating: 5,
            avatar: "./src/assets/authors/author-2.jpeg",
            link: ""
        }
    ];

    const navigate = useNavigate();
    return (
        <Box className="testimonials-container">
            {/* Latest Post Section */}
            <Box className="latest-post" sx={{
                width: '40%',
                height: {xs: 'auto', md: '500px'},
                p: 2
            }}>
                <Typography variant="h4" component="div" gutterBottom
                            sx={{fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>
                    {t("latest_posts")}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{width: '50px', height: '4px', backgroundColor: '#007BFF'}}/>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{
                        width: 'calc(100% - 240px)',
                        height: '1px',
                        backgroundColor: '#ddd',
                        marginBottom: '20px'
                    }}/>
                </Box>
                <Box sx={{display: 'flex', mb: 2, position: 'realtive', justifyContent: 'center'}}>
                    <img src="/src/assets/post.jpg" alt="Latest Post"
                         style={{maxWidth: '300%', height: 'auto', objectFit: 'cover'}}/>
                    <Box sx={{
                        width: {xs: '70%', lg: '28%'},
                        textAlign: 'center',
                        p: 3,
                        position: 'absolute',
                        marginTop: '20%',
                        bgcolor: 'white',
                        borderRadius: '5px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}>
                        <Typography variant="body1" gutterBottom
                                    sx={{fontWeight: 'bold', fontSize: '20px', mb: '15px'}}>
                            {t("post_title")}
                        </Typography>
                        <Typography variant="body2"
                                    sx={{maxWidth: '320px', mx: 'auto', fontSize: '16px', color: '#898989'}}>
                            {t("post_content")}
                        </Typography>
                        <Button sx={{mt: 2}} variant="contained"
                                onClick={() => navigate('/blogs')}>{t("read_more_btn")}</Button>
                    </Box>
                </Box>
            </Box>

            {/* Tour Reviews Section */}
            <Box className="tour-reviews" sx={{width: {xs: '100%', md: '50%'}, p: 2}}>
                <Typography variant="h4" component="div" gutterBottom
                            sx={{fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>
                    {t("tour_reviews")}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{width: '50px', height: '4px', backgroundColor: '#007BFF'}}/>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{
                        width: 'calc(100% - 240px)',
                        height: '1px',
                        backgroundColor: '#ddd',
                        marginBottom: '20px'
                    }}/>
                </Box>
                {reviews.map((review, index) => (
                    <Box key={index} sx={{mb: 3, display: 'flex', flexDirection: {xs: 'column', md: 'row'}}}>
                        <Box sx={{mt: 8}}>
                            <Avatar src={review.avatar} sx={{
                                width: '100px',
                                height: '100px',
                                border: '6px solid #ffffff',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                //     if small screen, center the avatar
                                mx: {xs: 'auto', md: '0'}
                            }}/>
                            <Typography variant="subtitle1" sx={{
                                fontWeight: 'light',
                                marginTop: '20px',
                                textAlign: 'center'
                            }}>{review.name}</Typography>
                        </Box>

                        <Box className="review-content"
                             sx={{display: 'block', paddingLeft: {xs: '0px', md: '90px'}, marginTop: '30px'}}>
                            <Typography variant="h6"
                                        sx={{fontWeight: 'bold', fontSize: '20px', mb: '15px', color: 'black'}}>
                                <a href={review.link} style={{textDecoration: 'none', color: 'black'}}>
                                    {review.destination}
                                </a>
                            </Typography>
                            <Typography variant="body2" sx={{
                                width: {xs: '100%', md: '500px'},
                                fontSize: '18px',
                                mb: '15px',
                                color: '#898989'
                            }}>{review.review}</Typography>
                            <Rating value={review.rating} readOnly/>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Testimonials;
