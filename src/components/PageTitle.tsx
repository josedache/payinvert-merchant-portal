import { Typography, TypographyProps } from "@mui/material";
import { createPortal } from "react-dom";
import { PAGE_TITLE } from "constants/portal";
import { useLayoutEffect, useState } from "react";

function PageTitle(props: TypographyProps) {
  const [container, setContainer] = useState<HTMLElement | null>(getContainer);

  useLayoutEffect(() => {
    let intervalId: any;

    if (!container) {
      intervalId = setInterval(() => {
        setContainer(getContainer);
      }, 10);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [container]);

  if (!container) return null;

  return createPortal(<Typography variant="h6" {...props} />, container);
}

export default PageTitle;

function getContainer() {
  return document.getElementById(PAGE_TITLE);
}
