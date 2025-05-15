"use client";

import { useEffect, useState } from "react";
import {
  Grid,
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
        setConfigurations("Last updated on 2025-05-14.");
      }, 2000);

      return () => clearTimeout(configTimeout);
    }
  }, [deployments]);

  return (
    <Grid container justifyContent="center" mt={6}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box mb={4}>
            <Typography variant="h6" gutterBottom>
              Deployments
            </Typography>

            {deployments ? (
              <>
                <Typography>
                  Arbitrum –{" "}
                  <Link
                    href="https://sepolia.arbiscan.io/address/0x3bc8de4cf6c075fb8e24a954ec1d1b12bdcbf336"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://sepolia.arbiscan.io/address/0x3bc8de4cf6c075fb8e24a954ec1d1b12bdcbf336
                  </Link>
                </Typography>
                <Typography>
                  Sepolia –{" "}
                  <Link
                    href="https://sepolia.etherscan.io/address/0x3bc8dE4CF6c075Fb8e24A954EC1D1B12bDcbF336"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://sepolia.etherscan.io/address/0x3bc8dE4CF6c075Fb8e24A954EC1D1B12bDcbF336
                  </Link>
                </Typography>
                <Typography>
                  Mantle –{" "}
                  <Link
                    href="https://sepolia.mantlescan.xyz/address/0x3bc8de4cf6c075fb8e24a954ec1d1b12bdcbf336"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://sepolia.mantlescan.xyz/address/0x3bc8de4cf6c075fb8e24a954ec1d1b12bdcbf336
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
              onClick={() => router.push("/")}
            >
              Go to Dashboard
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
