import { useFormContext, Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  Typography,
  Checkbox,
  Box,
  Divider,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Image from "next/image";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { QuoteFormValues } from "..";
import { useEffect } from "react";

export const BLOCKCHAINS = [
  {
    label: "Mantle",
    value: "mantle",
    icon: "/mantle.svg",
    contractCreation: 0.19448711,
    wiring: 0.06457882,
  },
  {
    label: "Ethereum",
    value: "ethereum",
    icon: "/ethereum.svg",
    contractCreation: 0.02405016,
    wiring: 0.00348915,
  },
  {
    label: "Arbitrum",
    value: "arbitrum",
    icon: "/arbitrum.svg",
    contractCreation: 0.02405016,
    wiring: 0.000008746,
  },
];

const protocols = ["OFT", "XRC20"];

interface Step1Props {
  onOpenDrawer: (theme: string) => void;
}

export const Step1 = ({ onOpenDrawer }: Step1Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();

  useEffect(() => {
    console.log("Errores", errors);
  }, [errors]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Typography variant="h6" gutterBottom>
            Blockchain Selection
          </Typography>
          <Controller
            name="blockchain"
            control={control}
            rules={{
              validate: (value) =>
                value?.length > 0 ? true : "Select at least one blockchain",
            }}
            render={({ field }) => (
              <Box>
                <Grid container spacing={2}>
                  {BLOCKCHAINS.map(({ label, value, icon }) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={value}>
                      <Box display="flex" alignItems="center">
                        <Checkbox
                          checked={field.value?.includes(value) || false}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const newValue = isChecked
                              ? [...(field.value || []), value]
                              : (field.value || []).filter((v) => v !== value);
                            field.onChange(newValue);
                          }}
                        />
                        <Image
                          src={icon}
                          alt={label}
                          width={20}
                          height={20}
                          style={{ marginRight: 6 }}
                        />
                        <Typography variant="body2">{label}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => onOpenDrawer(value)}
                        >
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                {errors && (
                  <Typography variant="caption" color="error" mt={1}>
                    {errors.blockchain?.message}
                  </Typography>
                )}
              </Box>
            )}
          />
          {!!errors.blockchain && (
            <FormHelperText>{errors.blockchain.message}</FormHelperText>
          )}
        </Grid>

        <Divider style={{ width: "100%" }} />

        <Grid size={12}>
          <Typography variant="h6" gutterBottom>
            Protocol Selection
          </Typography>
          <Controller
            name="protocol"
            control={control}
            rules={{
              required: "Select one protocol",
            }}
            render={({ field }) => (
              <Box>
                <Grid container spacing={2}>
                  {protocols.map((option) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={option}>
                      <Box display="flex" alignItems="center">
                        <Checkbox
                          checked={field.value === option}
                          onChange={(e) => {
                            field.onChange(e.target.checked ? option : "");
                          }}
                        />
                        <Typography variant="body2">{option}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => onOpenDrawer(option)}
                        >
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                {errors.protocol && (
                  <Typography variant="caption" color="error" mt={1}>
                    {errors.protocol.message}
                  </Typography>
                )}
              </Box>
            )}
          />
        </Grid>

        <Divider style={{ width: "100%" }} />

        <Grid size={12}>
          <Grid container alignContent={"center"}>
            <Grid>
              <Typography variant="h6" gutterBottom>
                Token Personalization
              </Typography>
            </Grid>
            <Grid>
              <IconButton
                size="small"
                onClick={() => onOpenDrawer("Token name and Token Symbol")}
              >
                <HelpOutlineIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" mb={1}>
                Name
              </Typography>
              <TextField
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                })}
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                placeholder="AL TOKE TOKEN"
                variant="standard"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" mb={1}>
                Symbol
              </Typography>
              <TextField
                {...register("symbol", {
                  required: "Symbol is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                })}
                fullWidth
                error={!!errors.symbol}
                helperText={errors.symbol?.message}
                placeholder="ATK"
                variant="standard"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
