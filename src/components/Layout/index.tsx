import Header from "@/components/Header";
import Side from "@/components/Side";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <Side />
      <main className="flex-grow">
        <Header />
        {children}
      </main>
    </div>
  );
}
