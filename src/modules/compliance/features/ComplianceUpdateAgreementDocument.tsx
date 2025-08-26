import useToggle from "hooks/use-toggle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
} from "@mui/material";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import { ReactNode } from "react";
import { LoadingButton } from "@mui/lab";
import { ComplianceAgreementDocumentType } from "modules/compliance/enums/compliance-agreement-document-type";
import PdfPreviewer from "components/PdfPreviewer";

function ComplianceUpdateAgreementDocument(
  props: ComplianceUpdateAgreementDocumentProps
) {
  const {
    type = ComplianceAgreementDocumentType.SLA,
    onCancel,
    onAccept,
    children,
    onClose,
    ...restProps
  } = props;

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const { title, pdfUrl } = {
    [ComplianceAgreementDocumentType.MSA]: {
      title: "Payinvert Merchant Service E-Agreement (MSA)",
      pdfUrl: "/pdfs/payinvert-msa.pdf",
    },
    [ComplianceAgreementDocumentType.SLA]: {
      title: "PayInvert Service Level Agreement (SLA)",
      pdfUrl: "/pdfs/payinvert-sla.pdf",
    },
  }[type];

  function handleClose(e?: any, reason?: any) {
    onClose?.(e, reason);
    setOpen(false);
  }

  function handleCancel(e?: any, reason?: any) {
    handleClose(e, reason);
    onCancel?.();
  }

  function handleAccept(e?: any, reason?: any) {
    handleClose(e, reason);
    onAccept?.();
  }

  return (
    <>
      <Dialog open={isOpen} fullWidth {...restProps}>
        <DialogTitleXCloseButton
          onClose={handleClose}
          className="bg-primary-main text-primary-contrastText"
        >
          {title}
        </DialogTitleXCloseButton>
        <DialogContent className="p-0">
          <PdfPreviewer src={pdfUrl} className="w-full h-[720px]" />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <LoadingButton
            // disabled={!formik.isValid || !formik.dirty}
            // loading={formik.isSubmitting}
            loadingPosition="end"
            endIcon={<></>}
            onClick={handleAccept}
          >
            Accept
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {typeof children === "function"
        ? children({ isOpen, toggleOpen, setOpen })
        : children}
    </>
  );
}

export default ComplianceUpdateAgreementDocument;

export type ComplianceUpdateAgreementDocumentProps = {
  type: ComplianceAgreementDocumentType;
  onCancel?: () => void;
  onAccept?: () => void;
  open?: boolean;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
} & Omit<DialogProps, "children" | "open" | "id">;
