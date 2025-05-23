import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { SmartContractAddress } from "../../multiStepForm/steps";
import { Deployment } from ".";

interface MerkleTreeDeploysProps {
  deployments: Deployment[] | null;
  setAddress: (address: SmartContractAddress[]) => void;
  address: SmartContractAddress[];
}

async function getSmartContractAddress(
  txHash: string,
  blockchain: "ethereum" | "mantle" | "arbitrum",
): Promise<SmartContractAddress> {
  const params = new URLSearchParams({ txHash, blockchain });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/merkle-tree?${params.toString()}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!res.ok) throw new Error(`Error fetching estimates: ${res.statusText}`);
  const data = await res.json();
  return { ...data, blockchain };
}

export const MerkleTreeSmartContractAddress = ({
  deployments,
  setAddress,
  address,
}: MerkleTreeDeploysProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!deployments || deployments.length === 0) return;
    if (address.length > 0) return;

    setLoading(true);

    async function fetchAllSmartContracts(deployments: Deployment[]) {
      try {
        const results = await Promise.all(
          deployments.map((d) =>
            getSmartContractAddress(d.txHash, d.blockchain),
          ),
        );
        setAddress(results);
      } catch (err) {
        console.error(err);
        setAddress([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllSmartContracts(deployments);
  }, [deployments, address.length, setAddress]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Smart Contract Address
      </Typography>
      {!deployments || loading ? (
        <LinearProgress />
      ) : (
        address.map((deployment) => (
          <Box key={deployment.blockchain} mb={1}>
            <Typography>
              {deployment.blockchain.toLocaleUpperCase()}:{" "}
              {deployment.contractAddress}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};
