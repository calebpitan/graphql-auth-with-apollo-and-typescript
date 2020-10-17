import { Express } from 'express'

export function isProduction(app: Express) {
  return app.get('env') === 'production'
}
