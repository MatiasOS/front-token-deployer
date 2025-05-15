import { Box, Link, Paper, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: "70%" }}>

        <Box mb={4}>
          <Typography>
            Send tx initiated. See: 
          </Typography>
          <Typography>
            <Link 
                href="https://testnet.layerzeroscan.com/tx/0x27b4a2ff822d68e4284c3a8b15ecfd4f38f0a2930b88c658ca2537b41173be34"
                target="_blank"
                rel="noopener noreferrer"
            >
              https://testnet.layerzeroscan.com/tx/0x27b4a2ff822d68e4284c3a8b15ecfd4f38f0a2930b88c658ca2537b41173be34
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}