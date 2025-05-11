import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

const StepperConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 0,
    border: "none",
    margin: 0,
    padding: 0,
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      top: -5,
      left: 0,
      width: "100%",
      height: 10,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12.5 18s6-4.419 6-6s-6-6-6-6m-7 12s6-4.419 6-6s-6-6-6-6' color='%23000'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "100% 15px",
      zIndex: 1,
    },
  },
}));

export default StepperConnector;
