import { Box, Container, Typography } from "@mui/material";
import React from "react";
import ListEmployees from "./ListEmployees";

export default function HomePage() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" gutterBottom>
          Employees List
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Box>
          <ListEmployees />
        </Box>
      </Container>
    </Box>
  );
}
