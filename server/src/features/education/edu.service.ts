import { Education } from "./edu.model.js";
import type { CreateEducationData, UpdateEducationData } from "./edu.schema.js";

export const getAllEducationService = async () => {
  return await Education.find().sort({ createdAt: -1 });
};

export const getEducationByIdService = async (id: string) => {
  return await Education.findById(id);
};

export const createEducationService = async (data: CreateEducationData) => {
  return await Education.create(data);
};

export const updateEducationService = async (
  id: string,
  data: UpdateEducationData,
) => {
  return await Education.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteEducationService = async (id: string) => {
  return await Education.findByIdAndDelete(id);
};
