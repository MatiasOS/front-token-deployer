import { useFormContext } from "react-hook-form";
import { Box, Divider, Typography } from "@mui/material";
import { OFTDeploys } from "../../components/oft/deploys";
import { useState } from "react";
import { OFTSmartContractAddress } from "../../components/oft/smartContractAddress";
import { OFTDistribution } from "../../components/oft/distributions";
import { QuoteFormValues } from "../../multiStepForm";
import { SmartContractAddress } from "../../multiStepForm/steps";
import { Deployment } from "../merkle-tree";

interface OFTSectionProps {
  oftAddress: SmartContractAddress[];
  setOftAddress: (oftAddress: SmartContractAddress[]) => void;
}

export const OFTSection = ({ oftAddress, setOftAddress }: OFTSectionProps) => {
  const [deployments, setDeployments] = useState<Deployment[] | null>(null);
  const [distribution, setDistribution] = useState<unknown | null>(null);
  const { getValues } = useFormContext<QuoteFormValues>();
  const formData = getValues();

  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "background.paper",
        p: { xs: 2, md: 4 },
        mt: 2,
        mb: 2,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        color="primary"
        gutterBottom
        sx={{ mb: 2, textAlign: "center" }}
      >
        OFT Summary
      </Typography>

      <OFTDeploys
        formData={formData}
        setDeployments={setDeployments}
        deployments={deployments}
      />

      <Divider sx={{ my: 2 }} />

      <OFTSmartContractAddress
        deployments={deployments}
        setOftAddress={setOftAddress}
        oftAddress={oftAddress}
      />

      <Divider sx={{ my: 2 }} />

      <OFTDistribution
        oftAddress={oftAddress}
        distribution={distribution}
        setDistribution={setDistribution}
      />
    </Box>
  );
};
