//import '@/styles/globals.css'
//
//export default function App({ Component, pageProps }) {
//  return <Component {...pageProps} />
//}

// ------------------ ! ------------------
// pages/_app.jsx

// This is only needed if you are using chakra-UI

import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
