import { useFormContext, Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  Typography,
  Checkbox,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { QuoteFormValues } from "..";
import { useState } from "react";
import { BlockchainInfoDrawer } from "../../(home)/blockchainInfoDrawer";

export const BLOCKCHAINS = [
  { label: "Mantle", value: "mantle", icon: "/mantle.svg" },
  { label: "Ethereum", value: "ethereum", icon: "/ethereum.svg" },
  { label: "Arbitrum", value: "arbitrum", icon: "arbitrum.svg" },
];

const protocols = ["OFT", "XRC20"];

export const Step1 = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(
    null,
  );

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<QuoteFormValues>();

  const handleOpenDrawer = (blockchain: string) => {
    setSelectedBlockchain(blockchain);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedBlockchain(null);
  };

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
                value?.length > 0 || "Select at least one blockchain",
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
                          onClick={() => handleOpenDrawer(value)}
                        >
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                {errors.blockchain && (
                  <Typography variant="caption" color="error" mt={1}>
                    {errors.blockchain.message}
                  </Typography>
                )}
              </Box>
            )}
          />
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
              validate: (value) =>
                value !== "" || "Select at least one protocol",
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
                        <IconButton>
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
              <IconButton>
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
      <BlockchainInfoDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        blockchain={selectedBlockchain}
      />
    </>
  );
};
