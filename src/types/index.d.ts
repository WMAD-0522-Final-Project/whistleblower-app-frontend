// add types & interfaces here!! (or in each component directory)

export type SampleType = string;

export interface Claim {
  id: string;
  submissionDate: string;
  message: string;
  labels: ClaimLabel[];
  category: ClaimCategory;
  members: {
    userId: string;
    avatarUrl: string;
  }[];
  chats: Chat[];
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
