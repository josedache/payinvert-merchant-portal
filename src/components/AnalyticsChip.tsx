import { Icon } from "@iconify/react/dist/iconify.js";
import { Chip, ChipProps } from "@mui/material";

type AnalyticsChipProps = {
  label: string;
} & ChipProps;
export default function AnalyticsChip(props: AnalyticsChipProps) {
  const { label, ...rest } = props;
  const trendSymbol = Number(label) > 0 ? "+" : Number(label) === 0 ? "" : "";
  const formattedLabel = `${trendSymbol}${label}%`;
  const color =
    Number(label) > 0 ? "success" : Number(label) === 0 ? "secondary" : "error";

  return (
    <Chip
      icon={
        <Icon
          icon={
            trendSymbol.startsWith("+")
              ? "ph:trend-up-fill"
              : "ph:trend-down-fill"
          }
          width={15}
        />
      }
      {...rest}
      color={color}
      label={formattedLabel}
    />
  );
}
