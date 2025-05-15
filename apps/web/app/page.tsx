import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { MultiStepForm } from "./multiStepForm";

export default function Home() {
  return (
    <Grid container>
      <Grid size={1}></Grid>
      <Grid size="grow">
        <MultiStepForm />
      </Grid>
      <Grid size={4}>
        <Button>size=4</Button>
      </Grid>
    </Grid>
  );
}
