import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  ExpressMiddlewareInterface,
} from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { decodeJWT } from '../utils/GenerateJWT';

/**
 * ErrorHandler middleware class
 * @class
 * @decorator `Middleware({ type: "after" })`
 */
@Middleware({ type: 'before' })
export class AuthMiddleware implements ExpressMiddlewareInterface {
  /**
   * Error handler method
   * @param {any} error
   * @param {Request} request
   * @param {Response} response
   * @param {any} next
   * @returns {any}
   */
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        try {
          const { userId } = await decodeJWT(bearerToken);
          req.userId = userId;
          next();
      } catch (error) {
          console.error(error);
          res.sendStatus(403); // Forbidden
      }
    } else {
        // No token found in the header
        res.sendStatus(403); // Forbidden
    }
}
}
