"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "mobx-react";
import { AuthStore } from "@/store/authStore";
// import rootStore from "@/store/index";
import rootStore from "@/store";
import { Observer } from "mobx-react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Provider rootStore={rootStore}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
