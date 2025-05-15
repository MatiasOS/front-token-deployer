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
import { Step1, Step2, Step3, Step4 } from "./steps";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const steps = ["Initial data", "Configurations", "Distribution", "Payments"];

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
  initialSupply: number;
  distributionType: "normal" | "later" | "mint_later";
  distributions: TokenDistribution[];
  reserveAmount?: number;
  owneable?: boolean;
  ownAddress?: string;
};

export const MultiStepForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const methods = useForm<QuoteFormValues>({
    defaultValues: {
      blockchain: [],
      protocol: "",
      name: "",
      symbol: "",
      initialSupply: 0,
      distributionType: "normal",
      distributions: [
        {
          blockchain: "",
          address: "",
          amount: 0,
        },
      ],
      reserveAmount: 0,
      owneable: false,
      ownAddress: "",
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
      router.push("/info");
    }, 2000);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      case 3:
        return <Step4 />;
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
                    "Pay"
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
