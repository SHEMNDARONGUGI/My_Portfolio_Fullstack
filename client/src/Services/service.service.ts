import api from "../lib/api";
import type {
  CreateServiceData,
  DeleteServiceResponse,
  ServiceItem,
  ServiceResponse,
  ServicesResponse,
  UpdateServiceData,
} from "../types/service";

export const getServices = async (): Promise<ServiceItem[]> => {
  const response = await api.get<ServicesResponse>("/services");

  return response.data.data;
};

export const getService = async (id: string): Promise<ServiceItem> => {
  const response = await api.get<ServiceResponse>(`/services/${id}`);

  return response.data.data;
};

export const createService = async (
  data: CreateServiceData,
): Promise<ServiceItem> => {
  const response = await api.post<ServiceResponse>("/services", data);

  return response.data.data;
};

export const updateService = async (
  id: string,
  data: UpdateServiceData,
): Promise<ServiceItem> => {
  const response = await api.patch<ServiceResponse>(`/services/${id}`, data);

  return response.data.data;
};

export const deleteService = async (id: string): Promise<void> => {
  await api.delete<DeleteServiceResponse>(`/services/${id}`);
};
