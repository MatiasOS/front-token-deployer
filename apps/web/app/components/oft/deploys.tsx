import React, { useEffect, useState } from "react";
import { QuoteFormValues } from "../../multiStepForm";
import { Box, LinearProgress, Typography } from "@mui/material";
import { Deployment } from "../merkle-tree";

interface DeploysProps {
  formData: QuoteFormValues;
  setDeployments: (deployments: Deployment[]) => void;
  deployments: Deployment[] | null;
}

const fetchDeployments = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formData: QuoteFormValues,
): Promise<Deployment[]> => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/oft`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error("Error creating OFT");
  return response.json();
  // return [
  //   {
  //     txHash:
  //       "0x0ecbbba9a658b6912c7e38576e0ff43e25860cd6749774674823bde16c013adf",
  //     blockchain: "ethereum",
  //   },
  //   {
  //     txHash:
  //       "0x53532cf7f9d97e131c6a023d91523af1950da3264242b2c00f9dfa0f6712b501",
  //     blockchain: "mantle",
  //   },
  //   {
  //     txHash:
  //       "0xc05c8c959b45bb95b1bf82c1898540c121d3703c92d57f00f3a0dfebf00fb6fb",
  //     blockchain: "arbitrum",
  //   },
  // ];
};

export const OFTDeploys = ({
  formData,
  setDeployments,
  deployments,
}: DeploysProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (deployments) return;
    fetchDeployments(formData)
      .then((data) => setDeployments(data))
      .catch((err) => {
        console.error(err);
        setDeployments([]);
      })
      .finally(() => setLoading(false));
  }, [formData, setDeployments, deployments]);

  if (loading || !deployments?.length) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Deploy txs
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Deploy txs
      </Typography>
      <Typography>Done</Typography>
    </Box>
  );
};
