import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { SmartContractAddress } from "../../multiStepForm/steps";
import { MerkleTreeData } from ".";

interface MerkleTreeDistributionProps {
  address: SmartContractAddress[];
  distribution: unknown | null;
  setDistribution: (distribution: unknown) => void;
  merkleTree: MerkleTreeData | null;
  oftAdrress: SmartContractAddress[];

}

export const MerkleTreeDistribution = ({
  address,
  distribution,
  setDistribution,
  merkleTree,
  oftAdrress,
}: MerkleTreeDistributionProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (distribution || !merkleTree || address.length === 0 || oftAdrress.length === 0) return;

    setLoading(true);

    const fetchAll = async () => {
      try {
        const totalAmountPerBlockchain: Record<string, bigint> = {};

        for (const [chain, info] of Object.entries(merkleTree)) {
          const sum = info.values.reduce((acc, entry) => {
            const amount = BigInt(entry.value[1] as string);
            return acc + amount;
          }, 0n);
          totalAmountPerBlockchain[chain] = sum;
        }

        const payloads = address.map(({ contractAddress, blockchain }) => ({
          blockchain,
          root: merkleTree[blockchain]?.tree[0],
          tokenAddress: oftAdrress.find(( {blockchain:b})=> b === blockchain)?.contractAddress,
          transferAmount: totalAmountPerBlockchain[blockchain],
          merkleTreeAddress: contractAddress
        }));

        console.log(payloads)
        const results = await Promise.all(
          payloads.map(async (payload) => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_URL}/merkle-tree/configure`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload, (_, v) => typeof v === 'bigint' ? v.toString() : v),
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

        setDistribution(results);
      } catch (err) {
        console.error(err);
        setDistribution([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [distribution, address, merkleTree, setDistribution, oftAdrress]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Configurations
      </Typography>
      {!address.length|| !distribution || loading ? <LinearProgress /> : <Typography>Done</Typography>}
    </Box>
  );
};