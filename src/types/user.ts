import { Notification } from "types/notification.ts";
import { Subsidiary } from "types/subsidiary.ts";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
  roleId: number;
  role: string;
  isEmailVerified: boolean;
  avatar: string | null;
  status: string;
  dateCreated: string;
};

export type AuthUser = {
  token: string;
  expiresIn?: string;
  refreshToken?: string;
  refreshExpiresIn?: string;
  isAuthenticated?: boolean;
  notifications: Notification[];
  user: User;
  loginHash: string | null;
  envronmentDetail: {
    id: number;
    name: string;
  };
  id: string;
  subsidiaryDetails: {
    total: number;
    subsidiaries: Subsidiary[];
  };
  activeSubsidiary: Subsidiary | null;
  routeToGetStarted: boolean;
};
