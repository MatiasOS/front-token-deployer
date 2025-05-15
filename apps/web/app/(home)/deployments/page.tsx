"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Button,
  Link,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const [deployments, setDeployments] = useState<string | null>(null);
  const [configurations, setConfigurations] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const deploymentTimeout = setTimeout(() => {
      setDeployments("All services deployed successfully.");
    }, 2000);

    return () => clearTimeout(deploymentTimeout);
  }, []);

  useEffect(() => {
    if (deployments) {
      const configTimeout = setTimeout(() => {
        setConfigurations("Completed.");
      }, 2000);

      return () => clearTimeout(configTimeout);
    }
  }, [deployments]);

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

          {deployments ? (
            <>
              <Typography>
                Arbitrum –{" "}
                <Link
                  href="https://sepolia.arbiscan.io/address/0x32c1337d6ad10a4d739903426dd8a5f9c1b322d5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://sepolia.arbiscan.io/address/0x32c1337d6ad10a4d739903426dd8a5f9c1b322d5
                </Link>
              </Typography>
              <Typography>
                Ethereum –{" "}
                <Link
                  href="https://sepolia.etherscan.io/address/0x66cb523542deb4a0b0d9a4d3d7bba2ebe4cfb8a2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://sepolia.etherscan.io/address/0x66cb523542deb4a0b0d9a4d3d7bba2ebe4cfb8a2
                </Link>
              </Typography>
              <Typography>
                Mantle –{" "}
                <Link
                  href="hhttps://sepolia.mantlescan.xyz/address/0x8dc6b87bd35ebb7cec70de2fbad1b6a0b6913c53"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://sepolia.mantlescan.xyz/address/0x8dc6b87bd35ebb7cec70de2fbad1b6a0b6913c53
                </Link>
              </Typography>
            </>
          ) : (
            <LinearProgress />
          )}
        </Box>

        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Last configurations
          </Typography>
          {configurations ? (
            <Typography>{configurations}</Typography>
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
