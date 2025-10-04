"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "@/app/context/LocationContext";
import styles from "./searchForm.module.scss";
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

interface FormData {
  location?: string;
  lat?: number;
  lng?: number;
  date: string;
}

function SearchForm() {
  const { selectedLocation, setSelectedLocation } = useLocation();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({ location: "", date: "" });
  const [isLoading, setIsLoading] = useState(false);

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

    const newErrors = { location: "", date: "" };
    let hasError = false;

    const now = new Date();
    const selectedDateTime = new Date(date);

    if (selectedDateTime < now) {
      newErrors.date =
        "A data e hora não podem ser anteriores à data e hora atuais.";
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
      };

      if (selectedLocation) {
        // Use coordinates from the map
        formData = { ...formData, ...selectedLocation };
      } else {
        // Use the named location string
        formData = { ...formData, location };
      }

      const response = await axios.post("/api/analyse-weather", formData);
      console.log("API Response:", response.data);
      // TODO: Handle the successful response and display the weather data
    } catch (error) {
      console.error("Error submitting form:", error);
      // TODO: Display an error message to the user
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
        <FormControl disabled={isLoading} error={!!errors.location}>
          <FormLabel>Selecione o local</FormLabel>
          <Input
            id="location"
            placeholder="Cidade, parque..."
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
        </FormControl>

        <FormControl disabled={isLoading} error={!!errors.date}>
          <FormLabel>Data da aventura</FormLabel>
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
          Analisar Clima
        </Button>
      </Stack>
    </Box>
  );
}

export default SearchForm;
