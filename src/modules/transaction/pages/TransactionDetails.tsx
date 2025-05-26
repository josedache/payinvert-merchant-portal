import { Paper, Typography } from "@mui/material";
import { orderApi } from "apis/order.ts";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import LoadingContent from "components/LoadingContent.tsx";
import * as dfns from "date-fns";

const TransactionDetails = () => {
  const { id } = useParams();

  const ordersQueryResult = orderApi.useGetOrdersQuery(
    useMemo(() => ({ params: { id: id } }), [id]),
    { skip: !id }
  );

  const order = ordersQueryResult.data?.data?.items?.[0];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography className="text-[18px] font-medium">
          Transaction details
        </Typography>
      </div>

      <LoadingContent
        loading={ordersQueryResult.isLoading}
        error={ordersQueryResult.isError}
        onRetry={ordersQueryResult.refetch}
      >
        {() => (
          <>
            <div className="space-y-8">
              <TransactionSection
                title="Order details"
                items={[
                  { label: "Order reference", value: order?.orderReference },
                  {
                    label: "Payment reference",
                    value: order?.paymentReference,
                  },
                  {
                    label: "Payment response code",
                    value: order?.paymentResponseCode,
                  },
                  {
                    label: "Payment response message",
                    value: order?.paymentResponseMessage,
                  },
                ]}
              />
              <TransactionSection
                title="Customer details"
                items={[
                  { label: "Customer name", value: order?.customerName },
                  { label: "Customer email", value: order?.customerEmail },
                  {
                    label: "Customer phone number",
                    value: order?.customerPhone,
                  },
                  { label: "Country", value: "" },
                ]}
              />
              <TransactionSection
                title="Payment details"
                items={[
                  { label: "Payment method", value: order?.paymentTypeName },
                  { label: "Currency", value: order?.currency },
                  { label: "Amount", value: order?.amount },
                  { label: "Status", value: order?.orderStatus },
                  { label: "Narration", value: order?.narration },
                  { label: "Remarks", value: order?.remarks },
                  { label: "Fee", value: order?.fee },
                  { label: "Subsidiary fee", value: order?.subsidiaryFee },
                  { label: "Customer fee", value: order?.customerFee },
                  { label: "Who bears fee?", value: order?.whoBearsFee },
                  {
                    label: "Date created",
                    value: order?.dateCreated
                      ? dfns.format(
                          order?.dateCreated,
                          "dd MMM yyyy hh:mm:ss aaa"
                        )
                      : null,
                  },
                  {
                    label: "Date updated",
                    value: order?.dateUpdated
                      ? dfns.format(
                          order?.dateUpdated,
                          "dd MMM yyyy hh:mm:ss aaa"
                        )
                      : null,
                  },
                  {
                    label: "Date payment confirmed",
                    value: order?.datePaymentConfirmed
                      ? dfns.format(
                          order?.datePaymentConfirmed,
                          "dd MMM yyyy hh:mm:ss aaa"
                        )
                      : null,
                  },
                ]}
              />
            </div>
          </>
        )}
      </LoadingContent>
    </div>
  );
};
export const Component = TransactionDetails;
export default TransactionDetails;

const TransactionSection = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: any }[];
}) => (
  <div className="rounded-bl-[8px] rounded-br-[8px] rounded-tl-[8px] rounded-tr-[8px] shadow-[0px_1px_2px_0px_#0000001F] z-10">
    <div className="bg-[#EDEDED] rounded-tl-[8px] rounded-tr-[8px] py-2.5 px-5">
      <Typography variant="h6" className="font-semibold">
        {title}
      </Typography>
    </div>
    <Paper className="">
      {items.map(({ label, value }, index) => (
        <div
          key={index}
          className="py-3.5 px-5 flex items-center justify-between gap-2"
        >
          <Typography className="flex-2 font-semibold">{label}</Typography>
          <Typography className="flex-3">{value ?? "N/A"}</Typography>
        </div>
      ))}
    </Paper>
  </div>
);
