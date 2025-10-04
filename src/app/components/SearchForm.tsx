"use client";

import React, { useState } from "react";
import styles from "./SearchForm.module.scss";

import { FaSearch } from "react-icons/fa";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";

function SearchForm() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({ location: "", date: "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const newErrors = { location: "", date: "" };
    let hasError = false;

    if (!location) {
      newErrors.location = "Por favor, insira um local.";
      hasError = true;
    }

    if (!date) {
      newErrors.date = "Por favor, selecione uma data.";
      hasError = true;
    } else {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0); // Set to midnight UTC
      const selectedDate = new Date(date); // Input 'YYYY-MM-DD' is parsed as UTC midnight

      if (selectedDate < today) {
        newErrors.date = "A data não pode ser anterior à data atual.";
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError) {
      console.log("Validation failed");
      return;
    }

    const formData = {
      location,
      date,
    };
    console.log("Form Data Submitted:", formData);
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
        <FormControl error={!!errors.location}>
          <FormLabel>Selecione o local</FormLabel>
          <Input
            id="location"
            placeholder="Cidade, parque..."
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (errors.location) {
                setErrors((prev) => ({ ...prev, location: "" }));
              }
            }}
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

        <FormControl error={!!errors.date}>
          <FormLabel>Data da aventura</FormLabel>
          <Input
            id="adventure-date"
            type="date"
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
