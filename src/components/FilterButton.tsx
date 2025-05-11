import { Button, ButtonProps, Icon } from "@mui/material";

/**
 *
 * @param {ButtonProps} props
 * @returns
 */
function FilterButton(props: ButtonProps) {
  return (
    <Button
      variant="outlined"
      color="inherit"
      startIcon={<Icon color="primary">filter_alt</Icon>}
      {...props}
    >
      {props.children || "Filter"}
    </Button>
  );
}

export default FilterButton;
