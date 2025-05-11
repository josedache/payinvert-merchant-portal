import React from "react";
import {
  InputAdornment,
  IconButton,
  TextFieldProps,
  TextField,
} from "@mui/material";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";

function PasswordTextField(props: TextFieldProps) {
  const { error, slotProps, ...rest } = props;
  const [isVisible, setVisible] = React.useState(false);
  const handleVisible = React.useCallback(() => setVisible((p) => !p), []);

  return (
    <TextField
      type={isVisible ? "text" : "password"}
      slotProps={{
        ...slotProps,
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleVisible}
                disabled={props.disabled}
              >
                <Icon
                  fontSize={25}
                  icon={
                    isVisible
                      ? "cuida:visibility-off-outline"
                      : "cuida:visibility-on-outline"
                  }
                  className={clsx(error ? "text-danger" : "text-primary")}
                />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      error={error}
      {...rest}
    />
  );
}

export default PasswordTextField;
