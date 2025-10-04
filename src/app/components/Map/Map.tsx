"use client";

import Script from "next/script";
import { useRef } from "react";
import { useLocation } from "@/app/context/LocationContext";
import styles from "./map.module.scss";
import type L from "leaflet";

// We've moved the map logic into its own component.
export default function Map() {
  const markerRef = useRef<L.Marker | null>(null);
  // Get the state updater function from our context.
  const { setSelectedLocation } = useLocation();

  // This function will run once the Leaflet script has loaded.
  const initializeMap = () => {
    // Check if the Leaflet library is available on the window object.
    if (typeof window.L === "undefined") {
      console.error("Leaflet script not loaded yet.");
      return;
    }

    const map: L.Map = window.L.map("map").setView([20, 0], 2) as L.Map;

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Set up the click event listener.
    map.on("click", (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      setSelectedLocation({ lat, lng });
      // If a marker already exists, remove it from the map.
      if (markerRef.current) {
        markerRef.current.remove();
      }
      // Add a new marker to the map and store its reference.
      markerRef.current = window.L.marker([lat, lng]).addTo(map);
    });
  };

  return (
    <>
      {/* We need the Leaflet CSS file for styling */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        strategy="afterInteractive"
        onLoad={initializeMap}
      />
      {/* The div where the map will be rendered */}
      <div id="map" className={styles.map}></div>
    </>
  );
}
