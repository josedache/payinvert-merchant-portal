import { createPortal } from "react-dom";
import { PAGE_TITLE } from "constants/portal";
import { useLayoutEffect, useState } from "react";
import PageBreadcrumbs, {
  PageBreadcrumbsProps,
} from "components/PageBreadcrumb";

function PageTitle(props: PageBreadcrumbsProps) {
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

  return createPortal(<PageBreadcrumbs {...props} />, container);
}

export default PageTitle;

function getContainer() {
  return document.getElementById(PAGE_TITLE);
}
