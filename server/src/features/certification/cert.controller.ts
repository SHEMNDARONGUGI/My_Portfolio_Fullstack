import { asyncHandler } from "../../utils/asyncHandler.js";
import type { Request, Response, RequestHandler } from "express";
import {
  getAllCertificatesService,
  getCertificateByIdService,
  createCertificateService,
  updateCertificateService,
  deleteCertificationService,
} from "./cert.services.js";

import { Certificate } from "./cert.model.js";

export const getAllCertificates: RequestHandler = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const certificates = await getAllCertificatesService();

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  },
);

export const getCertificateById: RequestHandler<{ id: string }> = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const certificateId = req.params.id as string;
    const certificate = await getCertificateByIdService(certificateId);

    if (!certificate) {
      res.status(404).json({
        success: false,
        message: "Certificate not found!",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: certificate,
    });
  },
);

export const createCertificate: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const certificate = await createCertificateService(req.body);

    res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      data: certificate,
    });
  },
);

export const updateCerticicate: RequestHandler<{ id: string }> = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const certificateId = req.params.id as string;
    const updatedCertificate = await updateCertificateService(
      certificateId,
      req.body,
    );

    if (!updatedCertificate) {
      res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      data: updatedCertificate,
    });
  },
);

export const deleteCertificate: RequestHandler<{ id: string }> = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const certificateId = req.params.id as string;
    const deletedCertificate = await deleteCertificationService(certificateId);

    if (!deletedCertificate) {
      res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `${certificateId} - Certicicate deleted successfully`,
    });
  },
);
