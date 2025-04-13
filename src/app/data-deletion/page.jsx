// src/app/data-deletion/page.js
import React from "react";

export default function DataDeletion() {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Data Deletion Instructions</h1>
        <p>Last updated: April 12, 2025</p>
  
        <p>
          If you wish to delete your data from our application, please follow the steps below:
        </p>
  
        <ol>
          <li>Send an email to <strong>contact@yourdomain.com</strong> with the subject line: <em>Facebook Data Deletion Request</em>.</li>
          <li>Include your Facebook user ID or the email address associated with your account.</li>
          <li>We will process your request and delete your data within 7 days.</li>
        </ol>
  
        <p>
          If you have any questions, please reach out to us at the email address above.
        </p>
      </div>
    );
  }
  