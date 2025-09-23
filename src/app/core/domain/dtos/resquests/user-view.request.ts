
export interface UserViewRequest {
  typeDocuments?: number[];
  document?: string;
  fullName?: string;
  username?: string;
  email?: string;
  status?: boolean;
  page: number;
  size: number;
}
