"use client";

import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Step1, Step2, Step3, Step4, Step5 } from "./steps";
import { FormProvider, useForm } from "react-hook-form";
import { NebulaChatDrawer } from "../(home)/nebulaChatDrawer";

const steps = [
  "Initial data",
  "Configurations",
  "Distribution",
  "Payments",
  "Summary",
];

export type TokenDistribution = {
  blockchain: string;
  address: string;
  amount: number;
};

export type QuoteFormValues = {
  blockchain: string[];
  protocol: string;
  name: string;
  symbol: string;
  distributions: TokenDistribution[];
  reserveAmount?: number;
  owneable?: boolean;
  ownAddress?: string;
};

export const MultiStepForm = () => {
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTheme, setDrawerTheme] = useState<string | null>(null);
  const methods = useForm<QuoteFormValues>({
    defaultValues: {
      blockchain: ["mantle"],
      protocol: "OFT",
      name: "ALTOKETOKEN",
      symbol: "ATK",
      distributions: [
        {
          blockchain: "mantle",
          address: "0x123",
          amount: 100,
        },
      ],
      reserveAmount: 0,
      owneable: false,
      ownAddress: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: QuoteFormValues) => {
    handleNext();
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleOpenDrawer = (theme: string) => {
    setDrawerTheme(theme);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setDrawerTheme(null);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 onOpenDrawer={handleOpenDrawer} />;
      case 1:
        return <Step2 onOpenDrawer={handleOpenDrawer} />;
      case 2:
        return <Step3 onOpenDrawer={handleOpenDrawer} />;
      case 3:
        return <Step4 />;
      case 4:
        return <Step5 />;
      default:
        return null;
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 4,
            }}
          >
            <Paper sx={{ p: 4, maxWidth: 800, borderRadius: 2, width: "100%" }}>
              <Typography variant="h5" mb={2} fontWeight="bold" color="primary">
                Create your Token
              </Typography>
              <Typography variant="body2" color="custom.sage" mb={3}>
                Please fill the form below to create your token.
              </Typography>

              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        color: "#fff",
                        "& .MuiStepLabel-label": { color: "#fff" },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {renderStep()}

              {activeStep < steps.length - 1 && (
                <Box mt={4} display="flex" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    Previous step
                  </Button>
                  {activeStep === steps.length - 2 ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={methods.handleSubmit(onSubmit)}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Pay with Credit Card"
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleNext}
                    >
                      Next step
                    </Button>
                  )}
                </Box>
              )}
            </Paper>
          </Box>
        </form>
      </FormProvider>
      <NebulaChatDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        theme={drawerTheme}
      />
    </>
  );
};
