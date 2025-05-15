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
import { Step1, Step2 } from "./steps";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const steps = ["Transfer data", "Payment"];

export type TokenDistribution = {
  blockchain: string;
  address: string;
  amount: number;
};

export type QuoteFormValues = {
  blockchainFrom: string
  blockchainTo: string
  addressTo: string
  amount: number
};

export const MultiStepForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const methods = useForm<QuoteFormValues>({
    defaultValues: {
      blockchainFrom: "",
      blockchainTo: "",
      addressTo: "",
      amount: 0,
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log("Formulario completo:", data);
  });
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit();
      router.push("/transfers");
    }, 2000);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
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
              Send cross-chain
            </Typography>
            <Typography variant="body2" color="custom.sage" mb={3}>
              Please fill the form below to make a cross-chain transfer. 
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

            <Box mt={4} display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Previous step
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handlePay}
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
          </Paper>
        </Box>
      </form>
    </FormProvider>
  );
};
