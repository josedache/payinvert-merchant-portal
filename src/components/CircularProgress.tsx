import Typography from "@mui/material/Typography";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <div className="relative inline-flex">
      <CircularProgress
        variant="determinate"
        sx={() => ({
          color: "#ECECEC",
        })}
        size={60}
        thickness={5}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        disableShrink
        sx={() => ({
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
          color: "##D99933",
        })}
        size={60}
        thickness={5}
        {...props}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Typography className="font-semibold text-white">{`${Math.round(props.value)}%`}</Typography>
      </div>
    </div>
  );
}

export default CircularProgressWithLabel;
