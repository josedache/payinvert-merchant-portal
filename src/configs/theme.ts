import type {} from "@mui/lab/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import {
  createTheme,
  responsiveFontSizes,
  alpha,
  PaletteOptions,
} from "@mui/material/styles";
import SlideUpTransition from "components/SlideUpTransition";
import DateFormat from "enums/date-format.ts";
import { toggleButtonGroupClasses } from "@mui/material";
import DatePickerTextField from "components/DatePickerTextField";

const commonPaletteOptions: PaletteOptions = {
  primary: {
    // "50": "#E7EEFF",
    // "100": "#FFE8E0",
    // "200": "#FFD1C1",
    // "300": "#FFB398",
    // "400": "#FF8D65",
    "500": "#19943C",
    // "600": "#BF4D25",
    // "700": "#803419",
    // "800": "#4D1F0F",
    // "900": "#260F07",
    // darker: "#260F07",
    contrastText: "#FFFFFF",
  },
  secondary: {
    "50": "#F3F1F5",
    "100": "#E7E2EA",
    "200": "#D0C5D6",
    "300": "#B09FBA",
    "400": "#886F97",
    "500": "#613F75",
    "600": "#492F58",
    "700": "#31203B",
    "800": "#1D1323",
    "900": "#1D1323",
    main: "#613F75",
    darker: "#1D1323",
    contrastText: "#FFFFFF",
  },
  neutral: {
    "50": "#F9FAFA",
    "100": "#F4F5F5",
    "200": "#ECECED",
    "300": "#CDCDD0",
    "400": "#9CA3AF",
    "500": "#686A71",
    "600": "#4F5159",
    "700": "#353941",
    "800": "#1C202A",
    "900": "#030712",
  },
  success: {
    "50": "#F0FDF4",
    "100": "#DCFCE7",
    "200": "#BBF7D0",
    "300": "#86EFAC",
    "400": "#4ADE80",
    "500": "#22C55E",
    "600": "#16A34A",
    "700": "#15803D",
    "800": "#166534",
    "900": "#14532D",
  },
  warning: {
    "50": "#FFFBEB",
    "100": "#FEF3C7",
    "200": "#FDE68A",
    "300": "#FCD34D",
    "400": "#FBBF24",
    "500": "#F59E0B",
    "600": "#D97706",
    "700": "#B45309",
    "800": "#92400E",
    "900": "#78350F",
  },
  error: {
    "50": "#FEF2F2",
    "100": "#FEE2E2",
    "200": "#FECACA",
    "300": "#FCA5A5",
    "400": "#F87171",
    "500": "#EF4444",
    "600": "#DC2626",
    "700": "#B91C1C",
    "800": "#991B1B",
    "900": "#7F1D1D",
  },
};

export const theme = responsiveFontSizes(
  createTheme({
    cssVariables: true,
    colorSchemes: {
      dark: false,
      light: {
        palette: {
          ...commonPaletteOptions,
          background: {
            default: "#F5F5F5",
            paper: "#FFFFFF",
          },
        },
      },
    },
    shadows: [
      "none",
      "0px 1px 2px 0px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
      "0px 2px 5px 0px rgba(145, 158, 171, 0.12),0px 2px 2px 0px rgba(145, 158, 171, 0.12),0px 3px 1px -2px rgba(145, 158, 171, 0.12)",
      "0px 2px 9px 0px rgba(145, 158, 171, 0.12),0px 1px 3px 0px rgba(145, 158, 171, 0.12),0px 3px 3px -2px rgba(145, 158, 171, 0.12)",
      "0px 4px 4px -1px rgba(145, 158, 171, 0.12),0px 0px 5px 0px rgba(145, 158, 171, 0.12),0px 1px 10px 0px rgba(145, 158, 171, 0.12)",
      "0px 6px 6px -1px rgba(145, 158, 171, 0.12),0px -1px 10px 0px rgba(145, 158, 171, 0.12),0px 1px 14px 0px rgba(145, 158, 171, 0.12)",
      "0px 6px 6px -1px rgba(145, 158, 171, 0.2),0px -2px 12px 0px rgba(145, 158, 171, 0.2),0px 1px 18px 0px rgba(145, 158, 171, 0.2)",
      "0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 5px 5px -3px rgba(0, 0, 0, 0.2)",
      "0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12), 0px 5px 6px -3px rgba(0, 0, 0, 0.2)",
      "0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12), 0px 7px 8px -4px rgba(0, 0, 0, 0.2)",
      "0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12), 0px 8px 10px -5px rgba(0, 0, 0, 0.2)",
      "0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12), 0px 11px 15px -7px rgba(0, 0, 0, 0.2)",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
    ],
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      },
    },
    typography: {
      fontFamily: [
        "Kumbh Sans",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
        "sans-serif",
        "-apple-system",
        "BlinkMacSystemFont",
      ].join(),

      // htmlFontSize: 10,
      fontSize: 12,
      // color: "#1D2129",
      button: {
        textTransform: "none",
        // fontWeight: 500,
        // fontSize: "0.785rem",
      },
      body1: {
        fontWeight: 450,
      },
      body2: {
        fontWeight: 450,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiContainer: {
        defaultProps: {
          maxWidth: "xl",
        },
      },
      MuiSwitch: {
        defaultProps: {
          color: "primary",
        },
        styleOverrides: {
          root: ({ theme }) => ({
            width: 50,
            height: 26,
            padding: 0,
            "& .MuiSwitch-switchBase": {
              padding: 0,
              margin: 3,
              transitionDuration: "300ms",
              "&.Mui-checked": {
                transform: "translateX(23px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                  border: "2px solid #B6DBC1",
                  opacity: 1,
                  backgroundColor: "transparent",
                },
                "& .MuiSwitch-thumb": {
                  backgroundColor: "#339E52",
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                  opacity: 0.5,
                },
              },
              "&.Mui-focusVisible .MuiSwitch-thumb": {
                backgroundColor: "#fff",
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                color: "#0ff",
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.7,
                backgroundColor: "#F5F5F5",
              },
            },
            "& .MuiSwitch-thumb": {
              boxSizing: "border-box",
              boxShadow: "0px 1px 4px 0px #00000036",
              backgroundColor: "#757575",
              width: 20,
              height: 20,
            },
            "& .MuiSwitch-track": {
              borderRadius: 26 / 2,
              border: "2px solid #E0E0E0",
              backgroundColor: "#F5F5F5",
              opacity: 1,
              transition: theme.transitions.create(["background-color"], {
                duration: 500,
              }),
            },
          }),
        },
      },
      MuiIcon: {
        defaultProps: {
          baseClassName: "material-symbols-outlined",
        },
      },
      MuiDatePicker: {
        defaultProps: {
          slots: { textField: DatePickerTextField },
        },
      },
      MuiDesktopDatePicker: {
        defaultProps: {
          format: DateFormat.SLASH_dd_MM_yyyy,
          slots: { textField: DatePickerTextField },
        },
      },
      MuiMobileDatePicker: {
        defaultProps: {
          format: DateFormat.SLASH_dd_MM_yyyy,
          slots: { textField: DatePickerTextField },
        },
      },

      MuiStepLabel: {
        styleOverrides: {
          root: {
            color: "inherit",
          },
          label: ({ theme }) => ({
            color: theme.palette.neutral[500],
            "&.MuiStepLabel-active": {
              color: theme.palette.primary.main,
            },
            "&.MuiStepLabel-completed": {
              color: theme.palette.success.main,
            },
          }),
          iconContainer: {
            padding: 1,
          },
        },
      },
      MuiToggleButtonGroup: {
        defaultProps: {
          variant: "pill",
          color: "neutral",
        },
        styleOverrides: {
          root: {
            variants: [
              {
                props: { variant: "pill" },
                style: ({ theme }) => {
                  return {
                    [`& .${toggleButtonGroupClasses.grouped}`]: {
                      margin: theme.spacing(0.8),
                      border: 0,
                      borderRadius: theme.shape.borderRadius,
                      [`&.${toggleButtonGroupClasses.selected}`]: {
                        boxShadow: `0px 2px 4px rgba(0,0,0,0.1)`,
                      },
                      [`&.${toggleButtonGroupClasses.disabled}`]: {
                        border: 0,
                      },
                    },
                    [`& .${toggleButtonGroupClasses.middleButton}, & .${toggleButtonGroupClasses.lastButton}`]:
                      {
                        marginLeft: -1,
                        borderLeft: "1px solid transparent",
                      },
                  };
                },
              },
              {
                props: { variant: "pill", color: "neutral" },
                style: ({ theme }) => {
                  return {
                    backgroundColor: (theme.vars || theme).palette.neutral[
                      "100"
                    ],
                    [`& .${toggleButtonGroupClasses.grouped}`]: {
                      [`&.${toggleButtonGroupClasses.selected}`]: {
                        backgroundColor: (theme.vars || theme).palette
                          .background.paper,
                        color: (theme.vars || theme).palette.neutral[700],
                      },
                    },
                  };
                },
              },
              {
                props: { variant: "pill", color: "primary" },
                style: ({ theme }) => {
                  return {
                    backgroundColor: (theme.vars || theme).palette.primary[
                      "50"
                    ],
                    [`& .${toggleButtonGroupClasses.grouped}`]: {
                      [`&.${toggleButtonGroupClasses.selected}`]: {
                        backgroundColor: (theme.vars || theme).palette.primary
                          .dark,
                        color: (theme.vars || theme).palette.primary
                          .contrastText,
                      },
                    },
                  };
                },
              },
            ],
          },
        },
      },
      MuiTabs: {
        defaultProps: {
          variant: "scrollable",
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minWidth: "auto",
          },
        },
      },
      MuiLoadingButton: {
        defaultProps: {
          variant: "contained",
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          variant: "contained",
          shape: "default",
        },
        variants: [
          {
            props: { shape: "default" },
            style: () => ({}),
          },
          {
            props: { shape: "square" },
            style: () => ({ borderRadius: 0 }),
          },
          {
            props: { shape: "circular" },
            style: () => ({ borderRadius: 24 }),
          },
          {
            props: { size: "large" },
            style: () => ({ padding: "14px 22px" }),
          },
          {
            props: { size: "medium" },
            style: () => ({ padding: "10px 16px" }),
          },
          {
            props: { size: "small" },
            style: () => ({ padding: "6px 10px" }),
          },
        ],
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            return {
              ...(ownerState.variant === "contained"
                ? {
                    "&.Mui-disabled": {
                      backgroundColor: alpha(
                        theme.palette[ownerState.color]?.main,
                        0.4
                      ),
                      color: alpha(
                        theme.palette[ownerState.color]?.contrastText,
                        0.9
                      ),
                    },
                  }
                : {}),
              ...(!isNaN(Number(ownerState.shape))
                ? { borderRadius: Number(ownerState.shape) }
                : {}),

              ...(ownerState.variant === "gradient"
                ? {
                    background: `linear-gradient(111.6deg, ${alpha(theme.palette[ownerState.color]?.main, 1)} 46.77%, ${alpha(theme.palette[ownerState.color]?.main, 0.8)} 76.64%, ${alpha(theme.palette[ownerState.color]?.main, 0.5)} 119.62%)`,
                    color: (theme.vars || theme).palette[ownerState.color]
                      ?.contrastText,
                    ":disabled": {
                      opacity: ".5",
                      background: (theme.vars || theme).palette[
                        ownerState.color
                      ]?.[100],
                      color: (theme.vars || theme).palette[ownerState.color]
                        ?.main,
                    },
                  }
                : {}),
              ...(ownerState.variant === "gradient" &&
              (ownerState.color === "primary" || !ownerState.color)
                ? {
                    background: `linear-gradient(111.6deg, #FF6630 46.77%, #F89130 76.64%, #EFC531 119.62%)`,
                    ":disabled": {
                      opacity: ".5",
                      background: (theme.vars || theme).palette.primary[100],
                      color: (theme.vars || theme).palette.primary?.main,
                    },
                  }
                : {}),
              ...(ownerState.variant === "soft"
                ? {
                    color:
                      theme.palette[ownerState.color]?.main ||
                      theme.palette.grey[500],
                    backgroundColor: alpha(
                      theme.palette[ownerState.color]?.main ||
                        theme.palette.grey[500],
                      0.1
                    ),
                    "&:hover": {
                      backgroundColor: alpha(
                        theme.palette[ownerState.color]?.main ||
                          theme.palette.grey[500],
                        0.3
                      ),
                    },
                  }
                : {}),
            };
          },
        },
      },
      MuiChip: {
        defaultProps: { variant: "soft" },
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            return {
              ...(ownerState.variant === "soft"
                ? {
                    color:
                      theme.palette[ownerState.color]?.main ||
                      theme.palette.grey[500],
                    backgroundColor: alpha(
                      theme.palette[ownerState.color]?.main ||
                        theme.palette.grey[500],
                      0.2
                    ),
                    padding: "1px px",
                    height: 24,
                    "&:hover": {
                      backgroundColor: alpha(
                        theme.palette[ownerState.color]?.main ||
                          theme.palette.grey[500],
                        0.3
                      ),
                    },
                  }
                : {}),
            };
          },
        },
      },
      MuiIconButton: {
        defaultProps: {},
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            return {
              ...(!isNaN(Number(ownerState.shape))
                ? { borderRadius: Number(ownerState.shape) }
                : {
                    borderRadius: { square: 0, default: 8 }[ownerState.shape],
                  }),
              ...(ownerState.variant === "contained"
                ? {
                    color:
                      theme.palette[ownerState.color]?.contrastText ||
                      theme.palette.text.primary,
                    backgroundColor:
                      theme.palette[ownerState.color]?.main ||
                      theme.palette.grey[500],
                    "&:hover": {
                      backgroundColor:
                        theme.palette[ownerState.color]?.dark ||
                        theme.palette.grey[700],
                    },
                  }
                : {}),
              ...(ownerState.variant === "soft"
                ? {
                    color:
                      theme.palette[ownerState.color]?.main ||
                      theme.palette.grey[500],
                    backgroundColor: alpha(
                      theme.palette[ownerState.color]?.main ||
                        theme.palette.grey[500],
                      0.2
                    ),
                    "&:hover": {
                      backgroundColor: alpha(
                        theme.palette[ownerState.color]?.main ||
                          theme.palette.grey[500],
                        0.3
                      ),
                    },
                  }
                : {}),
              ...(ownerState.variant === "outlined"
                ? {
                    border: `1px solid ${
                      theme.palette[ownerState.color]?.main ||
                      theme.palette.divider
                    }`,
                  }
                : {}),
            };
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          // shrink: true,
          // classes: { asterisk: "text-error-main" },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: () => ({
            "&.MuiInputBase-formControl": {},
          }),
        },
      },
      MuiFilledInput: {
        // defaultProps: { disableUnderline: true },
      },
      MuiOutlinedInput: {
        // defaultProps: { notched: false },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined" },
        styleOverrides: {
          root: () => {
            return {
              // "& .MuiFilledInput-input": {
              //   borderRadius: 16,
              // },
              //
              // "& .MuiFormLabel-root": {
              //   color: theme.palette.text.primary,
              //   fontWeight: theme.typography.fontWeightMedium,
              // },
              //
              // "&:focus-within": {
              //   "& .MuiFormLabel-root": {
              //     color: theme.palette.text.primary,
              //   },
              // },
              //
              // "&:focus": {
              //   border: "none",
              // },

              "& .MuiInputBase-input": {
                // fontSize: "1rem",

                "&:-webkit-autofill": {
                  WebkitBoxShadow: `0 0 0 100px transparent inset`,
                  WebkitTextFillColor: "#000000",
                },
              },

              // ...(ownerState.variant === "outlined"
              //   ? {
              //       paddingTop: ownerState.label
              //         ? ownerState.size === "small"
              //           ? 18
              //           : 24
              //         : undefined,
              //
              //       "& .MuiInputLabel-shrink": {
              //         transform:
              //           ownerState.size === "small"
              //             ? "translate(0px, 0px) scale(0.70)"
              //             : "translate(0px, 0px) scale(0.90)",
              //       },
              //
              //       "& .MuiInputBase-root": {
              //         backgroundColor: "#FFFFFF",
              //         borderRadius: 8,
              //
              //         "& > fieldset": {
              //           border: "1px solid #D1D5DB",
              //         },
              //       },
              //     }
              //   : {}),
              //
              // ...(ownerState.variant === "filled"
              //   ? {
              //       "& .MuiInputBase-root": {
              //         borderRadius: 8,
              //         paddingTop: ownerState.size === "small" ? 1 : 2,
              //         paddingBottom: ownerState.size === "small" ? 1 : 2,
              //       },
              //     }
              //   : {}),
            };
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            "&.MuiStepIcon-root.Mui-completed": {
              color: "#16A349",
            },
          },
        },
      },

      MuiStep: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },

      // MuiStepLabel: {
      //   styleOverrides: {
      //     iconContainer: {
      //       padding: 0,
      //     },
      //   },
      // },
      MuiPaper: {
        defaultProps: {
          shape: "circular",
          elevation: 1,
        },
        styleOverrides: {
          root: ({ ownerState }) => {
            return {
              borderRadius: { square: 0, default: 16 }[ownerState.shape],
              // border: `1px solid ${theme.palette.divider}`,
            };
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          TransitionComponent: SlideUpTransition,
        },
      },
    },
  })
);

export default theme;

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }

  interface PaletteColor {
    lighter?: string;
    lighterAlt?: string;
    darker?: string;
    darkerAlt?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    lighterAlt?: string;
    darker?: string;
    darkerAlt?: string;
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "2xl": true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }

  interface ButtonOwnProps {
    shape?: "square" | "default" | "circular" | number;
  }

  interface ButtonPropsVariantOverrides {
    soft: true;
    gradient: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonOwnProps {
    variant?: "contained" | "outlined" | "soft" | "default";
    shape?: "square" | "default" | number;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    soft: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperOwnProps {
    shape?: "square" | "default" | "circular" | number;
  }
}

declare module "@mui/material/ToggleButtonGroup" {
  interface ToggleButtonGroupPropsColorOverrides {
    neutral: true;
  }

  interface ToggleButtonGroupProps {
    variant?: "standard" | "pill";
  }
}
