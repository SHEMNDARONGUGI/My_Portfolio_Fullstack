import api from "../lib/api";

interface UploadImageResponse {
  success: boolean;
  data: {
    url: string;
  };
}

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await api.post<UploadImageResponse>("/uploads", formData);

  return response.data.data.url;
};

export const getImageUrl = (imagePath: string): string => {
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const apiBaseUrl = api.defaults.baseURL;
  if (!apiBaseUrl) {
    throw new Error("VITE_API_URL is not configured");
  }

  return new URL(imagePath, new URL(apiBaseUrl, window.location.origin).origin)
    .toString();
};
