"use client";

import React from "react";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { useLocation } from "@/app/context/LocationContext";
import SearchForm from "../SearchForm";
import Logo from "../Logo";
import styles from "./sidebar.module.scss";

function Sidebar() {
  const { selectedLocation } = useLocation();

  return (
    <Sheet component="aside" className={styles.sidebar}>
      <Logo />
      <Box>
        <SearchForm />
        {selectedLocation && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography level="h4" component="h2" sx={{ mb: 1 }}>
              Localização Selecionada
            </Typography>
            <Typography>Latitude: {selectedLocation.lat.toFixed(4)}</Typography>
            <Typography>
              Longitude: {selectedLocation.lng.toFixed(4)}
            </Typography>
          </Box>
        )}
      </Box>
    </Sheet>
  );
}

export default Sidebar;
