import React, { useEffect, useState } from "react";
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
import { BLOCKCHAINS } from "./step1";

interface EstimateResponse {
  blockchain: string;
  contractCreationEstimate: number;
  wiringEstimate: number;
}

interface EstimatePayload {
  blockchain: string;
  contractCreation: number;
  wiring: number;
  amount: number;
}

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

const formatToUSDCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code",
  });
  return formatter.format(value);
};

async function getEstimatesFromApi(
  payload: EstimatePayload[],
): Promise<EstimateResponse[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/estimates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estimates: payload }),
  });
  if (!res.ok) {
    throw new Error(`Error fetching estimates: ${res.statusText}`);
  }
  return res.json();
}

export const Step4 = () => {
  const { getValues } = useFormContext<QuoteFormValues>();
  const resume = getValues();

  const [estimates, setEstimates] = useState<EstimateResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEstimates = async () => {
      try {
        const payload: EstimatePayload[] = resume.distributions.map((dist) => {
          const bc = BLOCKCHAINS.find((b) => b.value === dist.blockchain);
          if (!bc)
            throw new Error(`Blockchain ${dist.blockchain} not in config`);
          return {
            blockchain: dist.blockchain,
            contractCreation: bc.contractCreation,
            wiring: bc.wiring,
            amount: dist.amount,
          };
        });

        const data = await getEstimatesFromApi(payload);
        setEstimates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEstimates();
  }, [resume.distributions]);

  const totalCost = estimates.reduce(
    (sum, { contractCreationEstimate, wiringEstimate }) =>
      sum + contractCreationEstimate + wiringEstimate,
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
        {/* <ArraySummaryRow label="Distribution" value={resume.distributions} /> */}
      </Grid>

      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          Payment Data
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {loading ? (
          <Box sx={{ mt: 2 }}>
            <LinearProgress />
          </Box>
        ) : (
          <>
            {estimates.map(
              ({ blockchain, contractCreationEstimate, wiringEstimate }) => (
                <React.Fragment key={blockchain}>
                  <SimpleSummaryRow label={blockchain} />
                  <SimpleSummaryRow
                    label="Contract Creation"
                    value={formatToUSDCurrency(contractCreationEstimate)}
                  />
                  <SimpleSummaryRow
                    label="Wiring"
                    value={formatToUSDCurrency(wiringEstimate)}
                  />
                  <Divider sx={{ my: 2, borderStyle: "dashed" }} />
                </React.Fragment>
              ),
            )}
            <SimpleSummaryRow
              label="Total"
              value={formatToUSDCurrency(totalCost)}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
};
