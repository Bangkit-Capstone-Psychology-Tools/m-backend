import { Request } from "@decorators/express"

declare global {
    namespace Express {
      interface Request {
        userId: string
      }
    }
  }
  