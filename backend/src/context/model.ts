import mongoose, { Document, Schema } from "mongoose";

// Define Campaign Interface
export interface ICampaign extends Document {
  name: string;
  campaignDetail: string;
  image: string;
  affectedCity: string;
  contractAddress: string;
  //   description?: string;
  //   goalAmount?: number;
  //   startDate?: Date;
  //   endDate?: Date;
}

// Define Mongoose Schema
export const CampaignSchema = new Schema<ICampaign>({
  //   campaignID: { type: Number, unique: true, required: true },
  name: { type: String, required: true,unique: true, },
  contractAddress: { type: String, required: true },
  campaignDetail: { type: String },
  image: { type: String },
  affectedCity: { type: String, required: true },

  //   goalAmount: { type: Number },
  //   startDate: { type: Date },
  //   endDate: { type: Date },
});

// Export Model
export const Campaign = mongoose.model<ICampaign>("Campaign", CampaignSchema);
