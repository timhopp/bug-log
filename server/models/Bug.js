import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


const Bug = new Schema({
  closed: { type: Boolean, required: true, default: false },
  description: { type: String, required: true },
  title: { type: String, required: true },
  closedDate: { type: Date},
  flagged: { type: String, enum: ["pending", "completed", "rejected"] },
  name: { type: String, required: false },
  creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })


export default Bug