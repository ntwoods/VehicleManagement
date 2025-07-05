export type Vehicle = {
  id: string;
  name: string;
  registrationNumber: string;
  type: "2-wheeler" | "4-wheeler";
  insuranceExpiry: string; // ISO date string
  pucExpiry: string; // ISO date string
  insuranceDocument?: string; // URL
  pucDocument?: string; // URL
};
