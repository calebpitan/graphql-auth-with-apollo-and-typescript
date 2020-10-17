export const SALT_ROUNDS = 8
export const SECRET = process.env.SECRET

export const CORS = {
  credentials: true,
  origin: ['http://localhost:7000', 'https://localhost:7000'],
  methods: ['POST', 'OPTIONS'],
}
