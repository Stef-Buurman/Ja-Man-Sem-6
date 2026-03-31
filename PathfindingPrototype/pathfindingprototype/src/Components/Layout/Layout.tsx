import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="header-content">
          <h1 className="logo">Pathfinding Prototype</h1>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/2d">2D Map</Link>
            <Link to="/test3d">3D V1</Link>
            <Link to="/3d">3D V2</Link>
            <Link to="/3dV2">3D V3</Link>
            <Link to="/editor">Graph Editor</Link>
          </nav>
        </div>
      </header>

      <main className="layout-main">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>

      <footer className="layout-footer">
        © {new Date().getFullYear()} Indoor Navigation App
      </footer>
    </div>
  );
};