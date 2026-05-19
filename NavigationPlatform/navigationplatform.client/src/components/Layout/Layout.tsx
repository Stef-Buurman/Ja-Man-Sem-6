import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import type { LayoutProps } from "./Layout.props";

export const Layout: React.FC<LayoutProps> = ({ isAdmin }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="header-content">
          <h1 className="logo">Prototype Project</h1>
          <nav className="nav-links">
            {!isAdmin && <Link to="/">Map</Link>}
            {!isAdmin && <Link to="/heatmap">Heatmap</Link>}
            {isAdmin && <Link to="/admin/graph-editor">Graph Editor</Link>}
            {isAdmin && <Link to="/admin/heatmap-editor">Heatmap Editor</Link>}
          </nav>
        </div>
      </header>

      <main className="layout-main">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>

      <footer className="layout-footer">© {new Date().getFullYear()} Prototype Project. All rights reserved.</footer>
    </div>
  );
};
