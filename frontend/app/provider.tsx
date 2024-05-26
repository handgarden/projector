"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

export default function Provider({ children }: { children: React.ReactNode }) {
  const tokenLogin = useAuthStore((state) => state.tokenLogin);

  useEffect(() => {
    tokenLogin();
  }, [tokenLogin]);

  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
