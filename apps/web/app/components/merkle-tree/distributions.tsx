import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { SmartContractAddress } from "../../multiStepForm/steps";

interface MerkleTreeDistributionProps {
  address: SmartContractAddress[];
  distribution: unknown | null;
  setDistribution: (distribution: unknown) => void;
}

async function fetchDistribution(
  address: SmartContractAddress[],
): Promise<unknown> {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/merkle-tree/distribute`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(address),
  // });
  // if (!response.ok) throw new Error("Error creating address");
  // return response.json();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "Distribution fetched successfully",
        data: address,
      });
    }, 2000);
  });
}

export const MerkleTreeDistribution = ({
  address,
  distribution,
  setDistribution,
}: MerkleTreeDistributionProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address.length || distribution) return;
    setLoading(true);
    fetchDistribution(address)
      .then((data) => setDistribution(data))
      .catch((err) => {
        console.error(err);
        setDistribution([]);
      })
      .finally(() => setLoading(false));
  }, [address, setDistribution, distribution]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Distributions
      </Typography>
      {!address || loading ? <LinearProgress /> : <Typography>Ok</Typography>}
    </Box>
  );
};
