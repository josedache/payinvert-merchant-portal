import SettingComplianceAddEdit from "modules/settings/features/SettingComplianceAddEdit";
import PageTitle from "components/PageTitle";

export default function DashboardOnboarding() {
  return (
    <div>
      <PageTitle>Compliance</PageTitle>
      <SettingComplianceAddEdit isInitialOnboarding />
    </div>
  );
}

export const Component = DashboardOnboarding;
