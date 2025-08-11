import { Paper, Typography, Icon, ButtonBase } from "@mui/material";
import { ComplianceUpdateContentProps } from "../types/compliance-update";
import { LoadingButton } from "@mui/lab";
import { ComplianceBusinessType } from "modules/compliance/enums/compliance-business-type";
import { Icon as Iconify } from "@iconify/react";

function ComplianceUpdateBusinessType(
  props: ComplianceUpdateBusinessTypeSelectionProps
) {
  const { formik, isView } = props;

  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      className="w-full max-w-xl p-6 space-y-4"
    >
      <Typography variant="h6" className="font-semibold">
        Select Business Type
      </Typography>
      <div className="space-y-4">
        {[
          {
            icon: (
              <svg
                width="44"
                height="42"
                viewBox="0 0 44 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 42V16H4V38H38V42H0ZM8 34V8H18V0H34V8H44V34H8ZM22 8H30V4H22V8Z"
                  fill="#578300"
                />
              </svg>
            ),
            title: "Start-up Business",
            description:
              "These are businesses that are not yet officially registered but want to be engaged in commerce through PayInvert.",
            value: ComplianceBusinessType.START_UP,
          },
          {
            icon: (
              <svg
                width="40"
                height="36"
                viewBox="0 0 40 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 36V0H20V8H40V36H0ZM4 32H8V28H4V32ZM4 24H8V20H4V24ZM4 16H8V12H4V16ZM4 8H8V4H4V8ZM12 32H16V28H12V32ZM12 24H16V20H12V24ZM12 16H16V12H12V16ZM12 8H16V4H12V8ZM20 32H36V12H20V16H24V20H20V24H24V28H20V32ZM28 20V16H32V20H28ZM28 28V24H32V28H28Z"
                  fill="#578300"
                />
              </svg>
            ),
            title: "Registered Business",
            description:
              "These are officially registered businesses with relevant corporate documentation.",
            value: ComplianceBusinessType.REGISTERED,
          },
        ].map((option) => {
          const selected = option.value === formik.values.businessType;
          return (
            <Paper
              component={ButtonBase}
              variant="outlined"
              className="space-y-4 p-4 block text-left"
              onClick={() => formik.setFieldValue("businessType", option.value)}
              key={option.value}
            >
              <div className="flex items-start justify-between gap-4">
                {option.icon}
                {selected ? (
                  <Icon color="primary">
                    {/*<Iconify icon="ic:twotone-circle" />*/}
                    <Iconify icon="carbon:circle-filled" />
                  </Icon>
                ) : (
                  <Icon color="primary">
                    <Iconify icon="ic:outline-circle" />
                  </Icon>
                )}
              </div>
              <div>
                <Typography variant="h6" gutterBottom>
                  {option.title}
                </Typography>
                <Typography>{option.description}</Typography>
              </div>
            </Paper>
          );
        })}
      </div>
      {!isView ? (
        <LoadingButton
          startIcon={
            <Iconify icon="humbleicons:check" width="20" height="20" />
          }
          fullWidth
          type="submit"
          loading={formik.isSubmitting}
        >
          Proceed
        </LoadingButton>
      ) : null}
    </Paper>
  );
}

export default ComplianceUpdateBusinessType;

export type ComplianceUpdateBusinessTypeSelectionProps =
  {} & ComplianceUpdateContentProps;
