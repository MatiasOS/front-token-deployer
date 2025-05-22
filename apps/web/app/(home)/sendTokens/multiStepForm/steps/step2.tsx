import { Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { QuoteFormValues } from "..";

export const Step2 = () => {
  const { getValues } = useFormContext<QuoteFormValues>();
  const { addressTo, amount, blockchainFrom, blockchainTo } = getValues();

  return (
    <Grid container spacing={4}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          Resume
        </Typography>

        <Typography variant="body1" gutterBottom>
          {`Sending ${amount} token(s) from ${blockchainFrom} to address ${addressTo} at network ${blockchainTo}`}
        </Typography>
      </Grid>
    </Grid>
  );
};
