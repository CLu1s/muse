import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { NextUIProvider } from "@nextui-org/react";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </ChakraProvider>
  );
}
