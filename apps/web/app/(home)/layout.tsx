"use client";
import React from "react";
import { Grid } from "@mui/material";
import { Sidebar } from "../sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid container>
      <Grid size={1}>
        <Sidebar />
      </Grid>
      <Grid size="grow">{children}</Grid>
    </Grid>
  );
}
