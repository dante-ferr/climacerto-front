"use client";

import React from "react";
import { useLocation } from "@/app/context/LocationContext";
import SearchForm from "../SearchForm";
import styles from "./sidebar.module.scss";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";

function Sidebar() {
  const { selectedLocation } = useLocation();

  return (
    <aside className={styles.sidebar}>
      <SearchForm />
      {selectedLocation && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 2 }} />
          <Typography level="h4" component="h2" sx={{ mb: 1 }}>
            Localização Selecionada
          </Typography>
          <Typography>Latitude: {selectedLocation.lat.toFixed(4)}</Typography>
          <Typography>Longitude: {selectedLocation.lng.toFixed(4)}</Typography>
        </Box>
      )}
    </aside>
  );
}

export default Sidebar;
