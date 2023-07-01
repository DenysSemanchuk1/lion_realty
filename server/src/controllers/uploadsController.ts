import { Request, Response } from "express";
import CustomError from "../errors";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { StatusCodes } from "http-status-codes";
export const uploadHousePhotos = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new CustomError.BadRequest("No files were uploaded");
  }
  let uploadedFiles: string[] = [];
  let uploadedData = req.files.images as UploadedFile[];
  if (uploadedData.length < 5) {
    throw new CustomError.BadRequest(
      "You have to upload at least 5 images for 1 house"
    );
  }
  for (let image of uploadedData) {
    if (!image.mimetype.startsWith("image")) {
      throw new CustomError.BadRequest("Please upload image files");
    }
    const uploadPath = path.join(
      __dirname,
      `../public/uploads/houses_photo/${image.name}`
    );
    image.mv(uploadPath);
    uploadedFiles.push(`/uploads/houses_photo/${image.name}`);
  }

  return res.status(StatusCodes.OK).json(uploadedFiles);
};

export const uploadProfilePhoto = async (req: Request, res: Response) => {
  if (!req.files) throw new CustomError.BadRequest("No files were uploaded");

  const uploadedPhoto = req.files.image as UploadedFile;

  if (!uploadedPhoto.mimetype.startsWith("image")) {
    throw new CustomError.BadRequest("Please upload image file");
  }

  const maxSize = 3 * (1024 * 1024);

  if (uploadedPhoto.size > maxSize) {
    throw new CustomError.BadRequest("Please upload image smaller 3MB");
  }

  const uploadPath = path.join(
    __dirname,
    "../public/uploads/agentsPhoto/",
    uploadedPhoto.name
  );
  uploadedPhoto.mv(uploadPath, (err) => err && res.json({ err }));

  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${uploadedPhoto.name}` } });
};
