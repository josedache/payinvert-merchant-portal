import PageTitle from "components/PageTitle";
import {
  Button,
  ButtonBase,
  Collapse,
  Divider,
  Icon,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import useToggle from "hooks/use-toggle";
import { useState } from "react";
import { cn } from "utils/cn";
import { supportCategoryApi } from "apis/support-category";
import { SupportCategoryHierarchy } from "types/support-category";
import LoadingContent from "components/LoadingContent";

function Support() {
  const categoryHierarchyListQueryResult =
    supportCategoryApi.useGetCategoryHierarchyQuery(undefined);

  const categoryHierarchyList = categoryHierarchyListQueryResult.data;

  return (
    <>
      <PageTitle breadcrumbs={[{ label: "Help & Support" }]}>
        Help & Support
      </PageTitle>
      <div className="flex gap-4">
        <div className="w-1/3 space-y-6">
          <Typography variant="body2">Need more help?</Typography>
          <Typography variant="h3" className="font-bold">
            Frequently Asked <br />
            <span className="text-primary-main">Questions</span>
          </Typography>
          <div>
            <Typography variant="h6" className="font-bold">
              Contact Us
            </Typography>
            {[
              { label: "Email:", value: "support@payinvert.com" },
              {
                label: "Telephone:",
                value: "+234-XXX-XXX-XXXX",
              },
            ].map(({ label, value }) => (
              <Typography variant="body2">
                {label}
                <span className="font-bold ml-1">{value}</span>
              </Typography>
            ))}
          </div>

          <div>
            <Button
              // href={`https://api.whatsapp.com/send?phone=2348137086544&text=hello`}
              href={`https://wa.me/${+2348133359593}?text=${encodeURI("Help me with Payinvert")}`}
              startIcon={<Icon>support_agent</Icon>}
            >
              Chat with us directly from WhatsApp.
            </Button>
            <Typography variant="caption" className="block mt-1">
              (Live chat available Monday–Friday, 9AM–5PM WAT){" "}
            </Typography>
          </div>
        </div>
        <div className="flex-1">
          <Paper elevation={0} className="p-4 space-y-4">
            <LoadingContent
              loading={categoryHierarchyListQueryResult.isLoading}
              error={categoryHierarchyListQueryResult.isError}
              onRetry={categoryHierarchyListQueryResult.refetch}
            >
              {() => (
                <>
                  {categoryHierarchyList?.map((categoryHierarchy) => {
                    return (
                      <FaqGroup
                        key={categoryHierarchy.id}
                        categoryHierarchy={categoryHierarchy}
                      />
                    );
                  })}
                </>
              )}
            </LoadingContent>
          </Paper>
        </div>
      </div>
    </>
  );
}

export const Component = Support;

export default Support;

function FaqGroup(props: { categoryHierarchy: SupportCategoryHierarchy }) {
  const { categoryHierarchy } = props;

  const [isCollapsed, toggleCollapsed] = useToggle();

  const [itemId, setItemId] = useState(-1);

  return (
    <Paper
      variant="outlined"
      className={cn(
        "p-4 space-y-2",
        isCollapsed && "bg-[#F4F7EE] border-primary-main"
      )}
    >
      <ButtonBase
        disableRipple
        onClick={toggleCollapsed}
        className="w-full flex items-center justify-between gap-4"
      >
        <Typography variant="h6">{categoryHierarchy?.name}</Typography>
        {isCollapsed ? (
          <IconButton
            disableRipple
            variant="contained"
            size="small"
            color="primary"
          >
            <Icon fontSize="small">keyboard_arrow_up</Icon>
          </IconButton>
        ) : (
          <IconButton disableRipple variant="soft" size="small" color="primary">
            <Icon fontSize="small">keyboard_arrow_down</Icon>
          </IconButton>
        )}
      </ButtonBase>
      <Collapse in={isCollapsed}>
        {categoryHierarchy.questions?.map((question, index) => {
          const selected = itemId === index;
          return (
            <div key={question.title}>
              {index ? <Divider /> : null}
              <div className="py-2">
                <ButtonBase
                  disableRipple
                  onClick={() => setItemId((id) => (id === index ? -1 : index))}
                  className="w-full flex items-center justify-between gap-4"
                >
                  <Typography color="primary" variant="body1">
                    {question.title}
                  </Typography>
                  {selected ? (
                    <IconButton disableRipple size="small">
                      <Icon fontSize="small">remove</Icon>
                    </IconButton>
                  ) : (
                    <IconButton disableRipple size="small">
                      <Icon fontSize="small">add</Icon>
                    </IconButton>
                  )}
                </ButtonBase>
                <Collapse in={selected}>
                  <Typography>{question.answer}</Typography>
                </Collapse>
              </div>
            </div>
          );
        })}
      </Collapse>
    </Paper>
  );
}
