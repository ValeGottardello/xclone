declare global {
  interface Window {
    FB: unknown;
    fbAsyncInit: () => void;
  }
}

export {};
declare module 'next/script' {
  export const Script: unknown;
}