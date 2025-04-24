'use client';
import { useEffect } from 'react';
declare const FB: any;

export default function FacebookSDKLoader() {
  useEffect(() => {
    if (document.getElementById('facebook-jssdk')) return;

    // Insert script
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.onload = () => {
      if (typeof FB !== 'undefined') {
        FB.init({
          appId: '1210280960607773',
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v18.0',
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  return null;
}
