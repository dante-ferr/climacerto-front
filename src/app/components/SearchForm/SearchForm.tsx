"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMountain, FaShoppingBasket, FaUmbrellaBeach } from "react-icons/fa";
import { WeatherAnalysis, useLocation } from "@/app/context/LocationContext";

import { FaSearch } from "react-icons/fa";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import CircularProgress from "@mui/joy/CircularProgress";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import styles from "./searchForm.module.scss";

interface FormData {
  name?: string;
  latitude?: number;
  longitude?: number;
  date: string;
  activityId: string;
}

function SearchForm() {
  const {
    selectedLocation,
    setSelectedLocation,
    setWeatherAnalysis,
    setError,
  } = useLocation();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({ location: "", date: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [activity, setActivity] = useState("praia");

  // Clear the other location input when one is used
  useEffect(() => {
    if (selectedLocation) {
      setLocation("");
    }
  }, [selectedLocation]);

  const handleLocationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocation(e.target.value);
    if (selectedLocation) {
      setSelectedLocation(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Clear previous results and errors
    setWeatherAnalysis(null);
    setError(null);

    const newErrors = { location: "", date: "" };
    let hasError = false;

    const now = new Date();
    const selectedDateTime = new Date(date);

    if (selectedDateTime < now) {
      newErrors.date = "The date and time cannot be in the past.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      console.log("Validation failed");
      return;
    }

    setIsLoading(true);
    try {
      let formData: FormData = {
        date,
        activityId: activity,
      };
      let analyzeEndpoint;

      if (selectedLocation) {
        // Use coordinates from the map
        formData = {
          ...formData,
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        };
        analyzeEndpoint = "coords";
      } else {
        // Use the named location string
        formData = { ...formData, name: location };
        analyzeEndpoint = "name";
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/analyze/${analyzeEndpoint}`,
        { params: formData }
      );

      console.log("API Response:", response.data);
      setWeatherAnalysis(response.data);
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage =
          error.response.data.message || "Error fetching weather analysis.";
      }
      console.error("Error submitting form:", error); // Keep for debugging
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      className={styles["search-form"]}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Stack spacing={3}>
        {/* <FormControl disabled={isLoading} error={!!errors.location}>
          <FormLabel>Select location</FormLabel>
          <Input
            id="location"
            placeholder="City, park..."
            value={location}
            onChange={handleLocationInputChange}
            endDecorator={
              <IconButton aria-label="search location">
                <FaSearch />
              </IconButton>
            }
          />
          {errors.location && (
            <FormHelperText>{errors.location}</FormHelperText>
          )}
        </FormControl> */}

        <FormControl disabled={isLoading}>
          <FormLabel>Activity</FormLabel>
          <ToggleButtonGroup
            value={activity}
            onChange={(event, newValue) => {
              if (newValue) {
                setActivity(newValue);
              }
            }}
            sx={{ gap: 1.5, width: "100%", "& > *": { flex: 1 } }}
          >
            <Button value="praia" startDecorator={<FaUmbrellaBeach />}>
              Beach
            </Button>
            <Button value="trilha" startDecorator={<FaMountain />}>
              Trail
            </Button>
            <Button value="piquenique" startDecorator={<FaShoppingBasket />}>
              Picnic
            </Button>
          </ToggleButtonGroup>
        </FormControl>

        <FormControl disabled={isLoading} error={!!errors.date}>
          <FormLabel>Date of the adventure</FormLabel>
          <Input
            id="adventure-date"
            type="datetime-local"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (errors.date) {
                setErrors((prev) => ({ ...prev, date: "" }));
              }
            }}
          />
          {errors.date && <FormHelperText>{errors.date}</FormHelperText>}
        </FormControl>

        <Button
          type="submit"
          disabled={(!location && !selectedLocation) || !date || isLoading}
          startDecorator={isLoading && <CircularProgress size="sm" />}
          sx={{
            mt: "1rem",
            backgroundColor: "var(--color-primary-500)",
            "&:hover": {
              backgroundColor: "var(--color-primary-600)",
            },
          }}
        >
          Analyze Climate
        </Button>
      </Stack>
    </Box>
  );
}

export default SearchForm;
