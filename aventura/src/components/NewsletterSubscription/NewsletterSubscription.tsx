import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import './NewsletterSubscription.css';
import { createSubscription } from '../../services/subscription-service'; // Adjust the import path

const NewsletterSubscription: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
    const userId = process.env.REACT_APP_EMAILJS_USER_ID || '';

    if (!serviceId || !templateId || !userId) {
      console.error('Missing environment variables for EmailJS');
      setMessage(t('subscription_failed'));
      return;
    }

    try {
      const response = await createSubscription({ email });

      if (response.status === 409) {
        setMessage(t('already_subscribed'));
      } else if (response.ok) {
        const templateParams = { email: email };
        await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          userId
        );

        setMessage(t('thank_you'));
        setEmail('');
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      setMessage(t('subscription_failed'));
    }
  };

  return (
    <Box
      className="newsletter-container"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" gutterBottom>
        {t('join')}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {t('monthly_deals')}
      </Typography>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <TextField
          type="email"
          variant="outlined"
          placeholder={t('placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="email-input"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="subscribe-button"
          startIcon={<EmailIcon />}
        >
          {t('subscribe')}
        </Button>
      </form>
      {message && (
        <Typography variant="body2" color="secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default NewsletterSubscription;
