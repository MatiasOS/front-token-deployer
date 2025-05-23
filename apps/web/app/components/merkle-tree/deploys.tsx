import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { SmartContractAddress } from "../../multiStepForm/steps";
import { Deployment, MerkleTreeData } from ".";

interface DeploysProps {
  merkleTree: MerkleTreeData | null;
  oftAdrress: SmartContractAddress[];
  setDeployments: (deployments: Deployment[]) => void;
  deployments: Deployment[] | null;
}

export const MerkleTreeDeploys = ({
  merkleTree,
  oftAdrress,
  setDeployments,
  deployments,
}: DeploysProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (deployments || !merkleTree || oftAdrress.length === 0) return;

    setLoading(true);

    const fetchAll = async () => {
      try {
        const payloads = oftAdrress.map(({ contractAddress, blockchain }) => ({
          blockchain,
          root: merkleTree[blockchain]?.tree[0],
          oftAddress: contractAddress,
        }));

        const results = await Promise.all(
          payloads.map(async (payload) => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_URL}/merkle-tree/deploy`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              },
            );
            if (!response.ok)
              throw new Error(`Error for ${payload.blockchain}`);
            const data = await response.json();
            return {
              txHash: data.txHash,
              blockchain: payload.blockchain,
            };
          }),
        );

        setDeployments(results);
      } catch (err) {
        console.error(err);
        setDeployments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [merkleTree, oftAdrress, deployments, setDeployments]);

  if (loading || !deployments) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Deployments
      </Typography>
      {deployments.map((deployment) => (
        <Box key={deployment.blockchain} mb={1}>
          <Typography>
            {deployment.blockchain.toLocaleUpperCase()}: {deployment.txHash}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
