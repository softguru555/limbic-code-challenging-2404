"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "@/context/userContext";
import { useState } from "react";
import { ColorProvider } from "@/context/colorContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Provider store={store}>
          <UserProvider>
            <ColorProvider>
              <PersistGate loading={null} persistor={persistor}>
                {children}
              </PersistGate>
            </ColorProvider>
          </UserProvider>
        </Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
