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
import { NebulaChatDrawer } from "../(home)/nebulaChatDrawer";
import { useDeploymentStore } from "../../stores/deploymentStore";

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
  distributions: TokenDistribution[];
  reserveAmount?: number;
  owneable?: boolean;
  ownAddress?: string;
};

export const MultiStepForm = () => {
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTheme, setDrawerTheme] = useState<string | null>(null);
  const router = useRouter();
  const methods = useForm<QuoteFormValues>({
    defaultValues: {
      blockchain: [],
      protocol: "",
      name: "",
      symbol: "",
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

  const setDeployments = useDeploymentStore((s) => s.setDeployments);

  interface Deployment {
    txHash: string;
    blockchain: "ethereum" | "mantle" | "arbitrum";
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: QuoteFormValues) => {
    try {
      // const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/oft`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      // if (!res.ok) throw new Error("Error creando OFT");
      // const deployments = await res.json();
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
      const deployments: Deployment[] = [
        {
          txHash:
            "0x0ecbbba9a658b6912c7e38576e0ff43e25860cd6749774674823bde16c013adf",
          blockchain: "ethereum",
        },
        {
          txHash:
            "0x53532cf7f9d97e131c6a023d91523af1950da3264242b2c00f9dfa0f6712b501",
          blockchain: "mantle",
        },
        {
          txHash:
            "0xc05c8c959b45bb95b1bf82c1898540c121d3703c92d57f00f3a0dfebf00fb6fb",
          blockchain: "arbitrum",
        },
      ];
      setDeployments(deployments);
    } catch (e) {
      console.error(e);
    } finally {
      router.push("/deployments");
    }
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
