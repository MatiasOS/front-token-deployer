import { useFormContext, useFieldArray } from "react-hook-form";
import {
  Grid,
  Button,
  Typography,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import { QuoteFormValues } from "..";
import { DistributionFields } from "../../components/distributionFields";
import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface Step3Props {
  onOpenDrawer: (theme: string) => void;
}

export const Step3 = ({ onOpenDrawer }: Step3Props) => {
  const { control } = useFormContext<QuoteFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "distributions",
  });

  return (
    <Grid container spacing={4}>
      <Grid size={12}>
        <Grid container alignContent={"center"}>
          <Grid>
            <Typography variant="h6" gutterBottom>
              Token Distribution
            </Typography>
          </Grid>
          <Grid>
            <IconButton
              size="small"
              onClick={() => onOpenDrawer("the token distribution on a token")}
            >
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>

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
