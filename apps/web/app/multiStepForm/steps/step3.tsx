import { useFormContext, useFieldArray } from "react-hook-form";
import { Grid, Button, Typography, Divider, Box } from "@mui/material";
import { QuoteFormValues } from "..";
import { DistributionFields } from "../../components/distributionFields";
import AddIcon from "@mui/icons-material/Add";

export const Step3 = () => {
  const { control } = useFormContext<QuoteFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "distributions",
  });

  return (
    <Grid container spacing={4}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          Token Distribution
        </Typography>

        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid size={12} key={field.id}>
              <DistributionFields index={index} remove={remove} />
            </Grid>
          ))}

          <Grid size={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() =>
                  append({ blockchain: "", address: "", amount: 0 })
                }
              >
                Add Distribution
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Divider style={{ width: "100%" }} />
    </Grid>
  );
};
