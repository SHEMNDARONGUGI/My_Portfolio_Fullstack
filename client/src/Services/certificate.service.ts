import api from "../lib/api";
import type {
  Certificate,
  CertificatesResponse,
  CertificateResponse,
  CreateCertificateData,
  UpdateCertificateData,
  DeleteCertificateResponse,
} from "../types/certificate";

export const getCertificates = async (): Promise<Certificate[]> => {
  const response = await api.get<CertificatesResponse>("/certificate");

  return response.data.data;
};

export const getCertificate = async (id: string): Promise<Certificate> => {
  const response = await api.get<CertificateResponse>(`/certificate/${id}`);

  return response.data.data;
};

export const createCertificate = async (
  data: CreateCertificateData,
): Promise<Certificate> => {
  const response = await api.post<CertificateResponse>("/certificate", data);

  return response.data.data;
};

export const updateCertificate = async (
  id: string,
  data: UpdateCertificateData,
): Promise<Certificate> => {
  const response = await api.patch<CertificateResponse>(`/certificate/${id}`, data);

  return response.data.data;
};

export const deleteCertificate = async (id: string): Promise<void> => {
  await api.delete<DeleteCertificateResponse>(`/certificate/${id}`);
};
