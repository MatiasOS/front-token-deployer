import { useFormContext } from "react-hook-form";
import { Box, Divider, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { QuoteFormValues } from "../../multiStepForm";
import { SmartContractAddress } from "../../multiStepForm/steps";
import { MerkleTreeDeploys } from "./deploys";
import { MerkleTreeSmartContractAddress } from "./smartContractAddress";
import { MerkleTreeDistribution } from "./distributions";

export type Deployment = {
  txHash: string;
  blockchain: "ethereum" | "mantle" | "arbitrum";
};

export interface MerkleTreeData {
  [chainName: string]: {
    tree: string[];

    values: {
      value: string[];
      treeIndex: number;
    }[];

    hashLookup: {
      [hash: string]: number;
    };

    leafEncoding: string[];
  };
}

async function generateMerkleTree(
  distribution: QuoteFormValues["distributions"],
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/merkle-tree`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({distribution}),
  });
  if (!res.ok) {
    console.error("Error creating Merkle-Tree", res);
    throw new Error(`Error fetching estimates: ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}

export const MerkleTreeSection = ({
  oftAdrress,
}: {
  oftAdrress: SmartContractAddress[];
}) => {
  const [deployments, setDeployments] = useState<Deployment[] | null>(null);
  const [address, setAddress] = useState<SmartContractAddress[]>([]);
  const [distribution, setDistribution] = useState<unknown | null>(null);
  const [merkleTree, setMerkleTree] = useState<MerkleTreeData | null>(null);
  const [loading, setLoading] = useState(false);
  const { getValues } = useFormContext<QuoteFormValues>();
  const distributions = getValues("distributions");

  useEffect(() => {
    setLoading(true);
    setMerkleTree(null);
    generateMerkleTree(distributions)
      .then(setMerkleTree)
      .catch((err) => {
        console.error(err);
        setMerkleTree(null);
      })
      .finally(() => setLoading(false));
  }, [distributions]);

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
        Merkle Tree Summary
      </Typography>
      <Typography variant="h6"> Merkle tree</Typography>
      {loading ? (
        <LinearProgress />
      ) : (
        <Typography>Generated successfully</Typography>
      )}

      <Divider sx={{ my: 2 }} />

      <MerkleTreeDeploys
        merkleTree={merkleTree}
        oftAdrress={oftAdrress}
        setDeployments={setDeployments}
        deployments={deployments}
      />

      <Divider sx={{ my: 2 }} />

      <MerkleTreeSmartContractAddress
        deployments={deployments}
        setAddress={setAddress}
        address={address}
      />

      <Divider sx={{ my: 2 }} />

      <MerkleTreeDistribution
        address={address}
        merkleTree={merkleTree}
        distribution={distribution}
        setDistribution={setDistribution}
        oftAdrress={oftAdrress}
      />
    </Box>
  );
};
