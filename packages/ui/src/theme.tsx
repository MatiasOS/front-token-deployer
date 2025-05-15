import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      seal_brown: string;
      raw_umber: string;
      khaki: string;
      sage: string;
      reseda_green: string;
      black_olive: string;
      violet_jtc: string;
      fandango: string;
      fandango2: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      seal_brown: string;
      raw_umber: string;
      khaki: string;
      sage: string;
      reseda_green: string;
      black_olive: string;
      violet_jtc: string;
      fandango: string;
      fandango2: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#c2c5aa",
    },
    secondary: {
      main: "#bb2f9c",
    },
    text: {
      primary: "#b6ad90",
      secondary: "#c2c5aa",
    },
    custom: {
      seal_brown: "#582f0e",
      raw_umber: "#936639",
      khaki: "#b6ad90",
      sage: "#c2c5aa",
      reseda_green: "#656d4a",
      black_olive: "#333d29",
      violet_jtc: "#663855",
      fandango: "#a23287",
      fandango2: "#bb2f9c",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "8px",
            },
            "&.Mui-error fieldset": {
              border: "1px solid #F7201A",
            },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px #1e1e1e inset !important",
              WebkitTextFillColor: "#FFF !important",
              transition: "background-color 5000s ease-in-out 0s",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-contained": {
            background: `linear-gradient(to right, #656d4a, #333d29)`,
          },
          "&.MuiButton-outlined": {
            borderColor: "#656d4a",
            color: "#656d4a",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#C2C5AA50",
            },
          },
        },
      },
    },
  },
});
