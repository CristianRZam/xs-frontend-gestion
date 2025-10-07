
export interface ParameterViewRequest {
  name?: string;
  shortName?: string;
  code?: string;
  type?: number;
  status?: boolean;
  page: number;
  size: number;
}
