/** @type {import('next').NextConfig} */
module.exports = {
    // ajoutez d'autres configurations ici aussi
    env: {
        OPENAIKEY: process.env.OPENAIKEY,
        Apikey: process.env.Apikey,
        Authdomain: process.env.Authdomain,
        ProjectId: process.env.ProjectId,
        StorageBucket: process.env.StorageBucket,
        MessagingSenderId: process.env.MessagingSenderId,
        AppId: process.env.AppId,
        MeasurementId: process.env.MeasurementId,
        BARDAI:process.env.BARDAI,
        RUNSQL:process.env.RUNSQL
    },
}
