// import random from 'random';

// // Generate a random float between 0 and 1


// // Generate a random integer between 0 and 10


// const accountSid = 'AC06572c345836cb1f86929eeeca68c53c';
// const authToken = '0d4e95d286cce73cdc7fa4b40e0cfeeb';
// const client = require('twilio')(accountSid, authToken);

// export async function testApi(no:Number):Promise<number>{
//     const otp=random.int(1000, 9999)
//     console.log(otp);
//     const x=await client.messages.create({
//         body: `your otp is ${otp}`,
//         from: '+12693943945',
//         to: `+918928710220`
//     })
//     console.log(x)
    
//     return otp

// }