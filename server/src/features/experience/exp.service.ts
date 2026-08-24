import { Experience } from "./exp.model.js";
import type {
  CreateExperienceData,
  UpdateExperienceData,
} from "./exp.schema.js";

export const getAllExperienceService = async () => {
  return await Experience.find().sort({
    startDate: -1,
  });
};

export const getExperienceByIdService = async (id: string) => {
  return await Experience.findById(id);
};

export const createExperienceService = async (data: CreateExperienceData) => {
  return await Experience.create(data);
};

export const updateExperienceService = async (
  id: string,
  data: UpdateExperienceData,
) => {
  return await Experience.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteExperienceService = async (id: string) => {
  return await Experience.findByIdAndDelete(id);
};
