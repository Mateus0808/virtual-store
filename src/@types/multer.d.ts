import { Readable } from 'stream'

interface InterfaceRequestFile {
  fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    key?: string
    location?: string
    stream: Readable;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}

interface InterfaceMulterServices {
  name: string,
  size: number,
  key: string,
  userId: string,
  url: string
}

export { InterfaceRequestFile, InterfaceMulterServices }
