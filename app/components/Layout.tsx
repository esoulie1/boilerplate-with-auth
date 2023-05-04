import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => (
  <div className="h-screen w-full bg-blue-600 font-mono">{children}</div>
);

export default Layout;
