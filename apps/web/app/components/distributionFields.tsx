import { Grid, MenuItem, TextField, Button } from "@mui/material";
import {
  useFormContext,
  Controller,
  UseFieldArrayRemove,
} from "react-hook-form";
import { QuoteFormValues } from "../multiStepForm";
import { BLOCKCHAINS } from "../multiStepForm/steps";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

interface DistributionFieldsProps {
  index: number;
  remove: UseFieldArrayRemove;
}

export const DistributionFields = ({
  index,
  remove,
}: DistributionFieldsProps) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();

  const selectedChains = watch("blockchain");
  const availableChains = BLOCKCHAINS.filter((b) =>
    selectedChains.includes(b.value),
  );

  return (
    <Grid container spacing={1} mb={1} alignItems={"center"}>
      <Grid size={4}>
        <Controller
          name={`distributions.${index}.blockchain`}
          control={control}
          rules={{ required: "Blockchain required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Blockchain"
              select
              fullWidth
              error={!!errors.distributions?.[index]?.address}
              helperText={errors.distributions?.[index]?.address?.message}
            >
              {availableChains.map(({ label, value, icon }) => (
                <MenuItem key={value} value={value}>
                  <Image
                    src={icon}
                    alt=""
                    width={15}
                    height={15}
                    style={{ marginRight: 4 }}
                  />
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>

      <Grid size="grow">
        <Controller
          name={`distributions.${index}.address`}
          control={control}
          rules={{ required: "Address required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              fullWidth
              error={!!errors.distributions?.[index]?.address}
              helperText={errors.distributions?.[index]?.address?.message}
            />
          )}
        />
      </Grid>

      <Grid size={2}>
        <Controller
          name={`distributions.${index}.amount`}
          control={control}
          rules={{
            required: "amount required",
            min: { value: 1, message: "Debe ser > 0" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Amount"
              type="number"
              fullWidth
              error={!!errors.distributions?.[index]?.amount}
              helperText={errors.distributions?.[index]?.amount?.message}
            />
          )}
        />
      </Grid>
      <Grid size={1}>
        <Button onClick={() => remove(index)}>
          <CloseIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
