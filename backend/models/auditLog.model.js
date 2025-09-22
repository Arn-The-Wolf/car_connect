import mongoose from 'mongoose'

const auditLogSchema = new mongoose.Schema({
  method: String,
  path: String,
  status: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ip: String,
  userAgent: String,
  metadata: Object
}, { timestamps: true })

const AuditLog = mongoose.model('AuditLog', auditLogSchema)

export default AuditLog

