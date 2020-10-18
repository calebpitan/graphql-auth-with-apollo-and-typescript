declare namespace Express {
  interface VerifiedAuthPayload {
    _id: string
    account_id: string
  }

  interface SessionData {
    account?: VerifiedAuthPayload & { email: string; scope?: string }
  }

  interface Request {
    auth?: {
      client: VerifiedAuthPayload
    }
  }
}
