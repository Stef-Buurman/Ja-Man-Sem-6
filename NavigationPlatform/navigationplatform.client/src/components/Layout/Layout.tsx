import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import footer from "/src/svgs/footer.svg";
import settings from "/src/svgs/settings.svg"

export const Layout = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <nav className="bg-[#00495F] text-left px-4 py-6">
        <div className="max-w-[600px] mx-auto flex gap-2">
          <img src={settings} alt="Settings" className="max-h-6" />
          <h1 className="font-medium text-[#FFF0EA]">Gebouw</h1>
        </div>
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

      <footer className="flex justify-center">
        <img src={footer} alt="Footer" className="w-[100vw] max-w-[600px] min-w-[220px] h-auto px-6" />
      </footer>
    </div>
  );
};
