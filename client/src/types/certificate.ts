export interface Certificate {
  _id: string;
  imageUrl?: string;
  certSource: string;
  certTitle: string;
  description: string;
  certLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CertificatesResponse {
  success: boolean;
  count: number;
  data: Certificate[];
}

export interface CertificateResponse {
  success: boolean;
  data: Certificate;
}

export interface CreateCertificateData {
  imageUrl?: string;
  certSource: string;
  certTitle: string;
  description: string;
  certLink?: string;
}

export interface UpdateCertificateData {
  imageUrl?: string;
  certSource?: string;
  certTitle?: string;
  description?: string;
  certLink?: string;
}

export interface DeleteCertificateResponse {
  success: boolean;
  message: string;
}
