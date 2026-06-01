import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export const Layout = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <nav className="bg-[#00495F] text-left px-4 py-6">
        <h1 className="font-medium text-[#FFF0EA]">Gebouw</h1>
        {isAdmin && (
          <div className="mt-2">
            <Link to="/admin/graph-editor" className="text-sm text-[#FFF0EA] hover:underline mr-4">
              Graph Editor
            </Link>
            <Link to="/admin/heatmap-editor" className="text-sm text-[#FFF0EA] hover:underline">
              Heatmap Editor
            </Link>
          </div>
        )}
      </nav>

      <main className="flex-1 bg-[#FFF0EA] py-6">
        <div className="w-full">
          <Outlet />
        </div>
      </main>

      <footer className="text-center px-4 py-6 bg-white text-black text-sm">© {new Date().getFullYear()} Prototype Project. All rights reserved.</footer>
    </div>
  );
};
