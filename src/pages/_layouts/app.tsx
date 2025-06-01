import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased mx-auto">
      <Header />
      <div className="flex flex-1 flex-row mx-auto max-w-7xl">
        <Outlet />
      </div>
    </div>
  );
}
