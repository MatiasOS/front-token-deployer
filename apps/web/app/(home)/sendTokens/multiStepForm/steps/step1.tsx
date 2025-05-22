import { useFormContext, Controller } from "react-hook-form";
import { Grid, TextField, MenuItem } from "@mui/material";
import Image from "next/image";
import { QuoteFormValues } from "..";

export const BLOCKCHAINS = [
  { label: "Mantle", value: "mantle", icon: "/mantle.svg" },
  { label: "Ethereum", value: "ethereum", icon: "/ethereum.svg" },
  { label: "Arbitrum", value: "arbitrum", icon: "arbitrum.svg" },
];

export const Step1 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();

  return (
    <Grid container spacing={1}>
      <Grid size={4}>
        <Controller
          name={`blockchainFrom`}
          control={control}
          rules={{ required: "Origin Blockchain required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Origin Blockchain"
              select
              fullWidth
              error={!!errors.blockchainFrom}
              helperText={errors.blockchainFrom?.message}
            >
              {BLOCKCHAINS.map(({ label, value, icon }) => (
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

      <Grid size={4}>
        <Controller
          name={`blockchainTo`}
          control={control}
          rules={{ required: "Destination Blockchain to required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Destination Blockchain"
              select
              fullWidth
              error={!!errors.blockchainFrom}
              helperText={errors.blockchainFrom?.message}
            >
              {BLOCKCHAINS.map(({ label, value, icon }) => (
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
          name="addressTo"
          control={control}
          rules={{ required: "Address required" }}
          render={({ field }) => (
            <TextField {...field} label="Address" fullWidth />
          )}
        />
      </Grid>

      <Grid size={2}>
        <Controller
          name="amount"
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
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
