import { Certificate } from "./cert.model.js";
import type {
  CreateCertificationData,
  UpdateCertificationData,
} from "./cert.schema.js";

export const getAllCertificatesService = async () => {
  return await Certificate.find();
};

export const getCertificateByIdService = async (id: string) => {
  return await Certificate.findById(id);
};

export const createCertificateService = async (
  data: CreateCertificationData,
) => {
  return await Certificate.create(data);
};

export const updateCertificateService = async (
  id: string,
  data: UpdateCertificationData,
) => {
  return await Certificate.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteCertificationService = async (id: string) => {
  return await Certificate.findByIdAndDelete(id);
};
