"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyProvider } from "@/context/userContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Provider store={store}>
          <MyProvider>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </MyProvider>

        </Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
