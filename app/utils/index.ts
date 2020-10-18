import { Express } from 'express'

export function isProduction(app: Express) {
  return app.get('env') === 'production'
}

export function createBadInput<TInput extends { [k: string]: any }>(input: TInput) {
  return { input }
}

export function createSession<TData extends { [k: string]: any }>(
  req: Express.Request,
  data: TData
) {
  if (!req.session) {
    return null
  }

  return Object.assign(req.session, data)
}
