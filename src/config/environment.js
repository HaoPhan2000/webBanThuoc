require("dotenv").config();
const env = {
  PORT: process.env.PORT,
  Domain: process.env.Domain,
  Private_KeyAccessToken: process.env.Private_KeyAccessToken,
  Private_KeyRefreshToken: process.env.Private_KeyRefreshToken,
  Private_KeyResetPassword: process.env.Private_KeyResetPassword,
  Time_JwtAccessToken: process.env.Time_JwtAccessToken,
  Time_JwtRefreshToken: process.env.Time_JwtRefreshToken,
  Time_JwtResetPassword: process.env.Time_JwtResetPassword,
  Email_Service:process.env.Email_Service,
  Email_UserName: process.env.Email_UserName,
  Email_PassWord: process.env.Email_PassWord,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  APP_HOST: process.env.APP_HOST,
  DB_DIALECT: process.env.DB_DIALECT,
};
module.exports=env