import type { PropsWithChildren } from "react";
import ToastWrapper from "@components/toastWrapper";
import Sidebar from "@components/app/sidebar/sidebar";

export const dynamic = "force-dynamic";

// TODO: pick a nice font

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="font-sans">
      <head />
      <body className="flex flex-row bg-white">
        <Sidebar />
        <main className="w-full px-6 py-8">{children}</main>
        <ToastWrapper />
      </body>
    </html>
  );
}

export default Layout;
