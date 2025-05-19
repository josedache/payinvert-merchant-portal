import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react/dist/iconify.js";

const CustomStepIconRoot = styled("div")<{ ownerState: { active: boolean } }>(
  () => ({
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    margin: 2,
    alignItems: "center",
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

function StepperIcon(props) {
  const { active, completed, className } = props;
  return (
    <CustomStepIconRoot ownerState={{ active }} className={className}>
      {active && !completed ? (
        <Icon
          className="text-[#0E8950]"
          icon="lets-icons:check-fill"
          width="25"
          height="25"
        />
      ) : (
        <>
          {completed ? (
            <Icon
              className="text-[#0E8950]"
              icon="lets-icons:check-fill"
              width="25"
              height="25"
            />
          ) : (
            <Icon
              className="text-[#616161] bg-transparent rounded-full"
              icon="hugeicons:circle"
              width="20"
              height="20"
            />
          )}
        </>
      )}
    </CustomStepIconRoot>
  );
}

export default StepperIcon;
