import SettingComplianceAddEdit from "modules/settings/features/SettingComplianceAddEdit";

export default function DashboardOnboarding() {
  return (
    <div>
      <SettingComplianceAddEdit isInitialOnboarding />
    </div>
  );
}

export const Component = DashboardOnboarding;
