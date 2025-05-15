import { useFormContext } from "react-hook-form";
import {
  Grid,
  Typography,
  Divider,
  Stack,
  LinearProgress,
  Box,
} from "@mui/material";
import { QuoteFormValues } from "..";
import React, { useEffect, useState } from "react";

const BLOCKCHAIN_COSTS = [
  {
    blockchainName: "ethereum",
    value: 2533.74,
    contractCreation: 0.02405016,
    wiring: 0.00348915,
  },
  {
    blockchainName: "arbitrum",
    value: 2533.74,
    contractCreation: 0.02405016,
    wiring: 0.000008746,
  },
  {
    blockchainName: "mantle",
    value: 0.7575,
    contractCreation: 0.19448711,
    wiring: 0.06457882,
  },
];

interface SimpleSummaryRowProps {
  label: string;
  value?: string | number;
}

const SimpleSummaryRow = ({ label, value }: SimpleSummaryRowProps) => (
  <Grid container>
    <Grid size={6}>
      <Typography variant="body1">{label}</Typography>
    </Grid>
    <Grid size={6} style={{ textAlign: "right" }}>
      <Typography variant="body2">{value}</Typography>
    </Grid>
  </Grid>
);

interface ArraySummaryRowProps {
  label: string;
  value: string[] | Record<string, unknown>[];
}

const ArraySummaryRow = ({ label, value }: ArraySummaryRowProps) => {
  const isStringArray = typeof value[0] === "string";

  return (
    <Grid container spacing={1}>
      <Grid size={6}>
        <Typography variant="body1">{label}</Typography>
      </Grid>
      <Grid size={6} style={{ textAlign: "right" }}>
        <Stack spacing={0.5}>
          {isStringArray
            ? (value as string[]).map((item, idx) => (
                <Typography key={idx} variant="body2">
                  {item}
                </Typography>
              ))
            : (value as Record<string, unknown>[]).map((obj, idx) => (
                <Typography key={idx} variant="body2">
                  {Object.values(obj).join(" ")}
                </Typography>
              ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export const Step4 = () => {
  const [estimate, setEstimate] = useState<number>(0);
  const { getValues } = useFormContext<QuoteFormValues>();
  const resume = getValues();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setEstimate(100);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  function calculateContractCreation(
    blockchain: string,
    amount: number,
  ): number {
    const data = BLOCKCHAIN_COSTS.find((b) => b.blockchainName === blockchain);
    if (!data) throw new Error("Blockchain not found");

    return data.value * amount * data.contractCreation;
  }

  function calculateWiring(blockchain: string, amount: number): number {
    const data = BLOCKCHAIN_COSTS.find((b) => b.blockchainName === blockchain);
    if (!data) throw new Error("Blockchain not found");

    return data.value * amount * data.wiring;
  }

  const totalCost = resume.distributions.reduce(
    (sum, { blockchain, amount }) => {
      return (
        sum +
        calculateContractCreation(blockchain, amount) +
        calculateWiring(blockchain, amount)
      );
    },
    0,
  );

  return (
    <Grid container spacing={4}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          Resume
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <ArraySummaryRow label="Blockchain" value={resume.blockchain} />
        <SimpleSummaryRow label="Name" value={resume.name} />
        <SimpleSummaryRow label="Protocol" value={resume.protocol} />
        <SimpleSummaryRow label="Symbol" value={resume.symbol} />
        <ArraySummaryRow label="Distribution" value={resume.distributions} />
      </Grid>

      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          Payment Data
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {estimate === 0 ? (
          <Box sx={{ mt: 2 }}>
            <LinearProgress />
          </Box>
        ) : (
          <>
            {resume.distributions.map((distribution, idx) => {
              const baseKey = `${distribution.blockchain}-${idx}`;
              return (
                <React.Fragment key={baseKey}>
                  <SimpleSummaryRow label={distribution.blockchain} />
                  <SimpleSummaryRow
                    key={`${baseKey}-contract`}
                    label="Contract Creation"
                    value={calculateContractCreation(
                      distribution.blockchain,
                      distribution.amount,
                    ).toFixed(2)}
                  />
                  <SimpleSummaryRow
                    key={`${baseKey}-wiring`}
                    label="Wiring"
                    value={calculateWiring(
                      distribution.blockchain,
                      distribution.amount,
                    ).toFixed(2)}
                  />
                  <Divider
                    key={`${baseKey}-divider`}
                    sx={{ mb: 2, mt: 2, borderStyle: "dashed" }}
                  />
                </React.Fragment>
              );
            })}

            <SimpleSummaryRow label="Total" value={totalCost.toFixed(2)} />
          </>
        )}
      </Grid>
    </Grid>
  );
};
