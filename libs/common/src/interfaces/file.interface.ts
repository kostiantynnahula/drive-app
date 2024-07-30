export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface FileValidationOptions {
  fieldName: string;
  maxCount?: number;
  totalSize?: number;
}
