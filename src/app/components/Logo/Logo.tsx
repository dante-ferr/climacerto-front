import React from "react";
import { Box, Typography } from "@mui/joy";

function Logo() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
      <img
        src="/logo.ico"
        alt="ClimaCerto logo"
        width="32"
        height="32"
        style={{ filter: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.6))" }}
      />
      <Typography level="h3" component="h1">
        ClimaCerto
      </Typography>
    </Box>
  );
}

export default Logo;
