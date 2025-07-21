import LogoSvg from "assets/svgs/logo.svg?react";
import LogoIconSvg from "assets/svgs/logo-icon.svg?react";

import { ComponentPropsWithoutRef } from "react";

function Logo(props: LogoProps) {
  const { ...restProps } = props;

  if (props.variant === "1") {
    return <LogoIconSvg {...restProps} />;
  }

  return <LogoSvg {...restProps} />;
}

export default Logo;

export type LogoProps = {
  variant?: "1" | "2";
} & ComponentPropsWithoutRef<typeof LogoSvg>;
