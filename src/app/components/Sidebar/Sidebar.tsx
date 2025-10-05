"use client";

import React from "react";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { useLocation } from "@/app/context/LocationContext";
import SearchForm from "../SearchForm";
import WeatherAnalysisDisplay from "./WeatherAnalysisDisplay";
import Logo from "../Logo";
import styles from "./sidebar.module.scss";

function Sidebar() {
  const { selectedLocation, weatherAnalysis } = useLocation();

  return (
    <Sheet component="aside" className={styles.sidebar}>
      <Logo />
      <SearchForm />
      {weatherAnalysis && <WeatherAnalysisDisplay analysis={weatherAnalysis} />}
      {selectedLocation && (
        <Box sx={{ mt: "auto" }}>
          <Divider sx={{ mb: 2 }} />
          <Typography
            level="title-lg"
            component="h2"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            Selected Location
          </Typography>
          <Typography level="body-sm">
            Latitude: {selectedLocation.lat.toFixed(4)}{" "}
          </Typography>
          <Typography level="body-sm">
            Longitude: {selectedLocation.lng.toFixed(4)}{" "}
          </Typography>
        </Box>
      )}
    </Sheet>
  );
}

export default Sidebar;
