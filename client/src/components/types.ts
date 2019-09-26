export interface FormField {
  disabled?: boolean;
  errored?: boolean;
  label: string;
  name: string;
  options?: {
    label: string;
    name: string;
  }[];
  value?: string | number | boolean;
  type: string;
}