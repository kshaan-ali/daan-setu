// // import random from 'random';

// // // Generate a random float between 0 and 1


// // // Generate a random integer between 0 and 10
// // const otp=random.int(1000, 9999)
// // console.log(otp);


// // type adhaarType={
// //     adhaarID:Number
// //     phoneNo:Number
// // }
// // export const tempData:adhaarType[]=[
// //     {
// //         adhaarID:679403332992,
// //         phoneNo:8928710220
// //     },
// //     {
// //         adhaarID:924330039897,
// //         phoneNo:9869799520
// //     },
// //     {
// //         adhaarID:793764499082,
// //         phoneNo:7208780451
// //     }
// // ]
// // const accountSid = 'AC06572c345836cb1f86929eeeca68c53c';
// // const authToken = '0d4e95d286cce73cdc7fa4b40e0cfeeb';
// // import twilio from "twilio";

// // export function testApi(no:Number){
// //     const client = twilio(accountSid, authToken);
// //     client.messages
// //     .create({
// //         body: `your otp is ${otp}`,
// //         from: '+12693943945',
// //         to: `+91${no}`
// //     })
// //     .then((message:any) => console.log(message.sid));
// //     return otp

// // }

// import random from 'random';
// import twilio from "twilio";
// import dotenv from "dotenv";

// // Load environment variables
// dotenv.config();

// // Twilio Credentials (Load from .env)
// const accountSid= process.env.TWILIO_ACCOUNT_SID || "AC06572c345836cb1f86929eeeca68c53c";
// const authToken = '0d4e95d286cce73cdc7fa4b40e0cfeeb';
// // const authToken: string = process.env.TWILIO_AUTH_TOKEN || "";
// const twilioPhoneNumbe = process.env.TWILIO_PHONE_NUMBER || "+12693943945";

// // Twilio Client
// const client = twilio(accountSid, authToken);

// // Aadhaar Data Structure


// // Temporary Aadhaar Data
// export const tempData= [
//     { aadhaarID: 679403332992, phoneNo: 8928710220 },
//     { aadhaarID: 924330039897, phoneNo: 9869799520 },
//     { aadhaarID: 793764499082, phoneNo: 7208780451 },
// ];

// // Function to Send OTP
// export async function sendOtp(phoneNo){
//     try {
//         // Generate a 4-digit OTP
//         const otp = random.int(1000, 9999);

//         // Send OTP via Twilio
//         const message = await client.messages.create({
//             body: `Your OTP is: ${otp}`,
//             from: twilioPhoneNumber,
//             to: `+91${phoneNo}`,
//         });

//         console.log(`OTP sent to ${phoneNo}. Message SID: ${message.sid}`);
//         return otp;
//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         throw new Error("Failed to send OTP");
//     }
// }

// // Example usage
// sendOtp(8928710220).then((otp) => console.log("Generated OTP:", otp));
