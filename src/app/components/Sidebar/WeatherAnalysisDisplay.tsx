import React from "react";
import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { WeatherAnalysis } from "@/app/context/LocationContext";

interface WeatherAnalysisDisplayProps {
  analysis: WeatherAnalysis;
}

function WeatherAnalysisDisplay({ analysis }: WeatherAnalysisDisplayProps) {
  const pros = Array.isArray(analysis.pros) ? analysis.pros : [analysis.pros];
  const cons = Array.isArray(analysis.cons) ? analysis.cons : [analysis.cons];

  return (
    <Card
      variant="outlined"
      sx={{
        mt: 4,
        borderLeft: "8px solid",
        borderColor: analysis.color,
        // Removing other borders to emphasize the left one
        borderTop: 0,
        borderRight: 0,
        borderBottom: 0,
        backgroundColor: "transparent",
      }}
    >
      {/* <Typography level="h4" component="h2" sx={{}}>
        Análise do Clima
      </Typography> */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography level="h1" sx={{ mr: 2 }}>
          {analysis.score}
        </Typography>
        <Typography level="h4" component="p">
          {analysis.qualitative}
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        {pros.map((pro, index) => (
          <Typography
            key={index}
            startDecorator={
              <FaCheckCircle color="var(--joy-palette-text-secondary)" />
            }
            sx={{
              mb: 0.5,
              alignItems: "flex-start",
              gap: "4px",
              "& .MuiTypography-startDecorator": { mt: "3.2px" },
            }}
          >
            {pro}
          </Typography>
        ))}
        {cons.map((con, index) => (
          <Typography
            key={index}
            startDecorator={
              <FaTimesCircle color="var(--joy-palette-text-secondary)" />
            }
            sx={{
              mb: 0.5,
              alignItems: "flex-start",
              gap: "4px",
              "& .MuiTypography-startDecorator": { mt: "3.2px" },
            }}
          >
            {con}
          </Typography>
        ))}
      </Box>
      {analysis.trendAlert && (
        <Typography
          startDecorator={
            <FaInfoCircle color="var(--joy-palette-text-secondary)" />
          }
          level="body-sm"
          fontWeight="lg"
          sx={{
            alignItems: "flex-start",
            gap: "4px",
            "& .MuiTypography-startDecorator": { mt: "3.2px" },
          }}
        >
          {analysis.trendAlert}
        </Typography>
      )}
    </Card>
  );
}

export default WeatherAnalysisDisplay;
