import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="header-content">
          <h1 className="logo">Prototype Project</h1>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/2dV1">2D Map</Link>
            <Link to="/3dV1">3D V1</Link>
            <Link to="/3dV2">3D V2</Link>
            <Link to="/3dV3">3D V3</Link>
            <Link to="/3dV4">3D V4</Link>
            <Link to="/editor">Graph Editor</Link>
            <Link to="/heatmap">Heatmap</Link>
            <Link to="/editor">Heatmap Editor</Link>
            <Link to="/Encryption">Encryption</Link>
          </nav>
        </div>
      </header>

      <main className="layout-main">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>

      <footer className="layout-footer">
        © {new Date().getFullYear()} Prototype Project. All rights reserved.
      </footer>
    </div>
  );
};
