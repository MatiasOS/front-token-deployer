import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { SmartContractAddress } from "../../multiStepForm/steps";

interface OFTDistributionProps {
  oftAddress: SmartContractAddress[];
  distribution: unknown | null;
  setDistribution: (distribution: unknown) => void;
}

async function fetchDistribution(
  oftAddress: SmartContractAddress[],
): Promise<unknown> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/oft/configure`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      configurations: oftAddress
        .map(({contractAddress, blockchain})=> ({address: contractAddress, blockchain}))
    }),
  });
  if (!response.ok) throw new Error("Error creating OFT");
  return response.json();
}

export const OFTDistribution = ({
  oftAddress,
  distribution,
  setDistribution,
}: OFTDistributionProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!oftAddress.length || distribution) return;
    setLoading(true);
    fetchDistribution(oftAddress)
      .then((data) => setDistribution(data))
      .catch((err) => {
        console.error(err);
        setDistribution([]);
      })
      .finally(() => setLoading(false));
  }, [oftAddress, setDistribution, distribution]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Configurations
      </Typography>
      {!oftAddress.length || !distribution || loading ? (
        <LinearProgress />
      ) : (
        <Typography>Done</Typography>
      )}
    </Box>
  );
};
