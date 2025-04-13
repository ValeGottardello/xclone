import type { Metadata } from "next";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
// import "./global";
import "./globals.css";
import Script from "next/script.js";

const inter = Inter({subsets: ['latin']})


export const metadata: Metadata = {
  title: "CloneX",
  description: "A clone of the CloneX website",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={inter.className}>
        {children}
        <Script
            id="facebook-sdk"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.fbAsyncInit = function() {
                  FB.init({
                    appId      : 'TU_APP_ID',
                    cookie     : true,
                    xfbml      : true,
                    version    : 'v19.0'
                  });

                  FB.AppEvents.logPageView();   
                };

                (function(d, s, id){
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) {return;}
                  js = d.createElement(s); js.id = id;
                  js.src = "https://connect.facebook.net/en_US/sdk.js";
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
              `,
            }}
          />
      </body>
    </html>
    
  );
}
