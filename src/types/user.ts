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
  notifications: Notification[];
  token: {
    accessToken: string;
  };
  isAuthenticated?: boolean;
  expiresIn?: string;
  user: User;
  loginHash: string | null;
  envronmentDetail: {
    id: number | null;
    name: string | null;
  };
  id: string;
  businessDetails: {
    id: number;
    accountNo: string;
    externalId: string;
    status: {
      id: number;
      code: string;
      value: string;
    };
    active: boolean;
    activationDate: [number, number, number];
    fullname: string;
    displayName: string;
    mobileNo: string;
    emailAddress: string;
    dateOfBirth: string | null;
    clientClassification: {
      id: number;
      name: string;
      active: boolean;
      mandatory: boolean;
    };
    isStaff: boolean;
    officeId: number;
    officeName: string;
    timeline: {
      submittedOnDate: [number, number, number] | null;
      submittedByUsername: string | null;
      submittedByFirstname: string | null;
      submittedByLastname: string | null;
      approvedOnDate: [number, number, number] | null;
      approvedByUsername: string | null;
      approvedByFirstname: string | null;
      approvedByLastname: string | null;
      activatedOnDate: [number, number, number] | null;
    };
    savingsProductName: string;
    savingsAccountId: number;
    legalForm: {
      id: number;
      code: string;
      value: string;
    };
    clientNonPersonDetails: {
      constitution: {
        id: number;
        name: string;
        active: boolean;
        mandatory: boolean;
      };
      incorpNumber: string | null;
      incorpValidityTillDate: string | null;
      mainBusinessLine: {
        id: number;
        name: string;
        active: boolean;
        mandatory: boolean;
      };
      remarks: string;
    };
  };
  subsidiaryDetails: Subsidiary | null;
  activeSubsidiary: Subsidiary | null;
  routeToGetStarted: boolean;
  status: string;
  statusCode: string;
  message: string;
};
