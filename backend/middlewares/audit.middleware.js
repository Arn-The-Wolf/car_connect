import AuditLog from '../models/auditLog.model.js'

export const auditLogger = async (req, res, next) => {
  const start = Date.now()
  const { method, originalUrl } = req
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const userAgent = req.headers['user-agent']

  res.on('finish', async () => {
    try {
      const duration = Date.now() - start
      const status = res.statusCode
      await AuditLog.create({
        method,
        path: originalUrl,
        status,
        user: req.user?._id,
        ip,
        userAgent,
        metadata: { durationMs: duration }
      })
    } catch (e) {
      // swallow logging errors
    }
  })

  next()
}


