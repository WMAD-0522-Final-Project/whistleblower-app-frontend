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

export type ClaimCategory = string;

export type ClaimLabel = string;

export interface Chat {
  id?: string;
  datetime: string;
  user: {
    id: string;
    avatarUrl?: string;
  };
  content: string;
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
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  permissions: permission[];
  role: string;
  department: department;
};

export type ContextType = {
  claimsId: string;
  userId: string;
};
