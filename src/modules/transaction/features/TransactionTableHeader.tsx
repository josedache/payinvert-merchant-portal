import { Button, Icon, Typography } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import TransactionFilter, {
  TransactionFilterProps,
} from "modules/transaction/features/TransactionFilter.tsx";

const TransactionTableHeader = (props: TransactionTableHeaderProps) => {
  const { total, filter, onFilterApply, onExport } = props;

  return (
    <div className="flex justify-between items-center gap-4">
      <Typography className="text-[18px] font-medium">
        Transactions - {total ?? 0}
      </Typography>
      <div className="flex gap-2 items-center text-text-secondary">
        <TransactionFilter filter={filter} onFilterApply={onFilterApply}>
          {({ toggleOpen }) => (
            <Button
              variant="outlined"
              size="small"
              endIcon={
                <Icon>
                  <Iconify icon="icon-park-solid:down-one" />
                </Icon>
              }
              className="bg-white"
              onClick={toggleOpen}
            >
              Filter
            </Button>
          )}
        </TransactionFilter>

        <Button
          variant="outlined"
          size="small"
          endIcon={
            <Icon>
              <Iconify icon="icon-park-solid:down-one" />
            </Icon>
          }
          className="bg-white"
          onClick={onExport}
        >
          Export
        </Button>
      </div>
    </div>
  );
};
export const Component = TransactionTableHeader;
export default TransactionTableHeader;

export type TransactionTableHeaderProps = {
  total: number;
  filter: TransactionFilterProps["filter"];
  onFilterApply: TransactionFilterProps["onFilterApply"];
  onExport?: () => void;
};
