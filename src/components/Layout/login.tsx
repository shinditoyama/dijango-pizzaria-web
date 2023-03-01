import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function LayoutLogin({ children }: Props) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
