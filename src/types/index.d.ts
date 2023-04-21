import { AxiosResponse, AxiosError } from 'axios';
import { ClaimStatus } from './enums';

export interface AxiosCustomErrorData {
  type: string;
  message: string;
}

export interface AxiosCustomError extends AxiosError<AxiosCustomErrorData> {}

export interface ClaimGeneral {
  id: string;
  submissionDate: string;
  message: string;
  status: ClaimStatus;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profileImg: string;
}

export interface InquiryUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ClaimCardDataGeneral {
  _id: string;
  title: string;
  body: string;
  status: ClaimStatus;
  hasNewComment: boolean;
  inChargeAdmins: InChargeAdmin[];
  createdAt: string;
}

export interface Claim {
  id: string;
  submissionDate: string;
  message: string;
  labels: ClaimLabel[];
  category: ClaimCategory | null;
  members: {
    userId: string;
    avatarUrl: string;
  }[];
  chats: Chat[];
  status: string;
}

export interface ClaimMessageData {
  _id: string;
  claimId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  user: User[];
}

export type ClaimStatusRes = 'unHandled' | 'inProcess' | 'done' | 'archived';

export type ClaimCategory = string;

export type ClaimLabel = string;

export interface Chat {
  _id?: string;
  claimId: string;
  message: string;
  createdAt: number;
  createdAt: number;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImg?: string;
  };
}

export interface InChargeAdmin {
  _id: string;
  firstName: string;
  lastName: string;
  profileImg: string;
}
export type permission = {
  _id: string;
  name: string;
};

export type department = {
  _id: string;
  name: string;
};

export type adminUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  permissions: permission[];
  role: string;
  department: department;
};
