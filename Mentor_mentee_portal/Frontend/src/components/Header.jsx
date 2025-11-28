import React, { useContext } from "react";
import Navbar from "./Navbar";
import "./Header.css";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../main";

const Header = () => {
  const theme = useTheme();
  const { mode, toggleMode } = useContext(ColorModeContext);
  const isDark = mode === "dark";

  return (
    <header className="header">
      <div className="logo">Mentor Mentee Portal</div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
          <IconButton
            size="small"
            onClick={toggleMode}
            sx={{ color: "inherit" }}
          >
            {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>
        </Tooltip>

        <Navbar />
      </div>
    </header>
  );
};

export default Header;
