import useCountdown, { UseCountdownOptions } from "hooks/use-countdown";

/**
 * @param {CountdownProps} props
 */
function Countdown(props: CountdownProps) {
  const { children, date, ...rest } = props;
  const countdown = useCountdown(date, rest);
  return children?.(countdown);
}

export default Countdown;

export type CountdownProps = {
  date: Date | number;
  children?: (countdown: ReturnType<typeof useCountdown>) => any;
} & UseCountdownOptions;
