"use client";

import { useEffect, useState } from "react";
import { Box, Paper, Typography, LinearProgress, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  useDeploymentStore,
  Deployment,
} from "../../../stores/deploymentStore";

interface SmartContract {
  contractAddress: string;
  blockchain: "ethereum" | "mantle" | "arbitrum";
}

interface DistributeResult {
  status: string;
}

export default function Home() {
  const [smartContracts, setSmartContracts] = useState<SmartContract[]>([]);
  const [configStatus, setConfigStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const deployments = useDeploymentStore((s) => s.deployments);
  const router = useRouter();

  // Paso 1: Obtener smart contracts de los deployments
  useEffect(() => {
    async function fetchAllSmartContracts(
      deployments: Deployment[],
    ): Promise<SmartContract[]> {
      return Promise.all(
        deployments.map((d) => getSmartContract(d.txHash, d.blockchain)),
      );
    }

    async function loadSmartContracts() {
      if (!deployments) {
        return;
      }
      try {
        const smartContractsFetched = await fetchAllSmartContracts(deployments);
        setSmartContracts(smartContractsFetched);
      } catch (err) {
        console.error("Error fetching smart contracts:", err);
      }
    }
    if (deployments) loadSmartContracts();
  }, [deployments]);

  // Paso 3: Con smart contracts, llamar a distribute (solo cuando todos estén)
  useEffect(() => {
    async function distributeContracts() {
      if (!smartContracts.length) return;
      try {
        // const result = await distribute(smartContracts);
        setConfigStatus("Ok");
      } catch (err) {
        console.error("Error in distribute:", err);
      } finally {
        setLoading(false);
      }
    }
    distributeContracts();
  }, [smartContracts]);

  async function getSmartContract(
    txHash: string,
    blockchain: "ethereum" | "mantle" | "arbitrum",
  ): Promise<SmartContract> {
    const params = new URLSearchParams({ txHash, blockchain });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/oft?${params.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!res.ok) {
      throw new Error(`Error fetching estimates: ${res.statusText}`);
    }
    const data = await res.json();

    return {
      ...data,
      blockchain: blockchain,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function distribute(
    smartContracts: SmartContract[],
  ): Promise<DistributeResult> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/oft/distribute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ smartContracts }),
    });
    if (!res.ok) throw new Error(`Error distribute: ${res.statusText}`);
    return res.json();
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: "70%" }}>
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Deployments
          </Typography>
          {!loading && smartContracts.length > 0 ? (
            smartContracts.map((sc) => (
              <Box key={sc.blockchain + sc.contractAddress} mb={1}>
                <Typography>{sc.blockchain.toUpperCase()}</Typography>
                <Typography>{sc.contractAddress}</Typography>
              </Box>
            ))
          ) : (
            <LinearProgress />
          )}
        </Box>

        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Last configurations
          </Typography>
          {!loading && configStatus ? (
            <Typography>{configStatus}</Typography>
          ) : (
            <LinearProgress />
          )}
        </Box>

        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/deployer")}
          >
            Go to Deployer
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
