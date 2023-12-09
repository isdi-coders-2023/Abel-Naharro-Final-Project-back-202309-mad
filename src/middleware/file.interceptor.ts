import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import createDebug from 'debug';

const debugServer = createDebug('LOG:MIDDLEWARE:FILE');

export class FileInterceptor {
  singleFileStore(fileName = 'file', fileSize = 10_000_000) {
    const options: multer.Options = {
      storage: multer.diskStorage({
        destination: './public/assets/img/offers/',
        filename(_req, file, callback) {
          const date = Date.now();
          callback(null, date + '-' + file.originalname);
        },
      }),
      limits: { fileSize },
    };

    const middleware = multer(options).single(fileName);

    return (req: Request, res: Response, next: NextFunction) => {
      const previousBody = req.body;
      debugServer('previousBody:', previousBody);
      middleware(req, res, next);
      debugServer('multer-body:', req.body);
      req.body = { ...previousBody, ...req.body };
      debugServer('final-body:', req.body);
    };
  }
}
