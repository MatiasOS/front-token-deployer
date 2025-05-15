import { useFormContext, Controller } from "react-hook-form";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Grid,
  Checkbox,
  TextField,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { QuoteFormValues } from "..";

export const Step2 = () => {
  const {
    control,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();

  const owneable = watch("owneable");

  return (
    <Grid container spacing={4}>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          Ownership
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box display="flex" alignItems="center">
              <Controller
                name="owneable"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      field.onChange(isChecked);
                      if (!isChecked) {
                        setValue("ownAddress", "");
                      }
                    }}
                  />
                )}
              />
              <Typography variant="body2">Transfer ownership</Typography>
              <IconButton>
                <HelpOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField
              fullWidth
              label="Address"
              disabled={!owneable}
              variant="standard"
              {...register("ownAddress", {
                required: owneable
                  ? "Address is required when ownership is enabled"
                  : false,
              })}
              error={!!errors.ownAddress}
              helperText={errors.ownAddress?.message}
            />
          </Grid>
        </Grid>
      </Grid>

      <Divider style={{ width: "100%" }} />
    </Grid>
  );
};
