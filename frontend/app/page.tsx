import { Metadata } from "next";
import SignIn from "./auth/signin/page";
export const metadata: Metadata = {
  title: "TailAdmin | E-commerce Dashboard Tempalte",
  description: "This is Home for TailAdmin",
};

export default function Home() {
  return (
    <>
      <SignIn />
    </>
  );
}
