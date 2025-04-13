declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export {};
declare module 'next/script' {
  export const Script: any;
}