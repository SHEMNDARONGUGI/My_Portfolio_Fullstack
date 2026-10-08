import { Service } from "./service.model.js";
import type {
  CreateServiceData,
  UpdateServiceData,
} from "./service.schema.js";

export const getAllServicesService = async () => {
  return await Service.find().sort({ createdAt: -1 });
};

export const getServiceByIdService = async (id: string) => {
  return await Service.findById(id);
};

export const createServiceService = async (data: CreateServiceData) => {
  return await Service.create(data);
};

export const updateServiceService = async (
  id: string,
  data: UpdateServiceData,
) => {
  return await Service.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteServiceService = async (id: string) => {
  return await Service.findByIdAndDelete(id);
};
