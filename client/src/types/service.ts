export interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesResponse {
  success: boolean;
  count: number;
  data: ServiceItem[];
}

export interface ServiceResponse {
  success: boolean;
  data: ServiceItem;
}

export interface CreateServiceData {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface UpdateServiceData {
  title?: string;
  description?: string;
  features?: string[];
  icon?: string;
}

export interface DeleteServiceResponse {
  success: boolean;
  message: string;
}
