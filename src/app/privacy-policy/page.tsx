import { Container } from '@mui/material';
import React from 'react';

export default function privacyPolicy() {
    return (

        <Container sx={{
            maxWidth: '600px',
            width: '100%',
            borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)', 
            minHeight: '100vh', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
          }}>
            <h1>Privacy Policy</h1>
            <p>Last updated:  April 12, 2025</p>
            <p>
                This application is currently under development. We do not actively collect, store, or share
                personal information from users.
            </p>

            <p>
                Third-party login methods (such as Facebook) are used solely for authentication purposes.
                No additional data is stored without user consent.
            </p>

            <p>
                If you have any questions about this privacy policy, feel free to contact us at: contact@yourdomain.com
            </p>
        </Container>

    )
}