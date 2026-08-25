import { Skill } from "./skill.model.js";
import type { UpdateSkillData, CreateSkillData } from "./skills.schema.js";

export const getAllSkillsService = async () => {
  return await Skill.find().sort({ createdAt: -1 });
};

export const getSkillByIdService = async (id: string) => {
  return await Skill.findById(id);
};

export const createSkillService = async (data: CreateSkillData) => {
  return await Skill.create(data);
};

export const updateSkillService = async (id: string, data: UpdateSkillData) => {
  return await Skill.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteSkillService = async (id: string) => {
  return await Skill.findByIdAndDelete(id);
};
