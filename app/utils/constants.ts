export const SALT_ROUNDS = 8
export const SECRET = process.env.SECRET
export const CLIENT_TOKEN_EXPIRY = 3600 * 24 // 1 day in seconds

export const CORS = {
  credentials: true,
  origin: ['http://localhost:7000', 'https://localhost:7000'],
  methods: ['POST', 'OPTIONS'],
}
