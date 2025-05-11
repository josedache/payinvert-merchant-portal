import { useState, useCallback } from "react";

function usePopover() {
  const [anchorEl, setAnchorEl] = useState(null);

  const togglePopover = useCallback((event?: any) => {
    setAnchorEl((p) => (p ? null : event?.currentTarget ?? event?.target));
  }, []);

  return {
    anchorEl,
    isOpen: Boolean(anchorEl),
    setAnchorEl,
    togglePopover,
  };
}

export default usePopover;
