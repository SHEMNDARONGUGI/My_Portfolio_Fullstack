import type { Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createServiceService,
  deleteServiceService,
  getAllServicesService,
  getServiceByIdService,
  updateServiceService,
} from "./service.service.js";

export const getAllServices: RequestHandler = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const services = await getAllServicesService();

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  },
);

export const getServiceById: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res): Promise<void> => {
    const id = req.params.id;
    if (typeof id !== "string") {
      res.status(400).json({ success: false, message: "Invalid service ID" });
      return;
    }
    const service = await getServiceByIdService(id);

    if (!service) {
      res.status(404).json({
        success: false,
        message: "Service not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  },
);

export const createService: RequestHandler = asyncHandler(
  async (req, res): Promise<void> => {
    const service = await createServiceService(req.body);

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  },
);

export const updateService: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res): Promise<void> => {
    const id = req.params.id;
    if (typeof id !== "string") {
      res.status(400).json({ success: false, message: "Invalid service ID" });
      return;
    }
    const service = await updateServiceService(id, req.body);

    if (!service) {
      res.status(404).json({
        success: false,
        message: "Service not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  },
);

export const deleteService: RequestHandler<{ id: string }> = asyncHandler(
  async (req, res): Promise<void> => {
    const id = req.params.id;
    if (typeof id !== "string") {
      res.status(400).json({ success: false, message: "Invalid service ID" });
      return;
    }
    const service = await deleteServiceService(id);

    if (!service) {
      res.status(404).json({
        success: false,
        message: "Service not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  },
);
