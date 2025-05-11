import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  borderRadius: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.neutral[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.neutral[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.neutral[900],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.neutral[900],
    }),
  },
}));

export default BorderLinearProgress;
