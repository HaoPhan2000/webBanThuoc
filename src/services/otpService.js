const otpGenerator = require("otp-generator");
const Otp = require("../models/otpModel");
const { StatusCodes } = require("http-status-codes");
const customError =require("../utils/customError")
const bcrypt = require("bcrypt");
const saltRounds = 10;

const otpService = {
  get: async (email) => {
    const OTP = otpGenerator.generate(6, {
      digits:true,
      lowerCaseAlphabets:false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    try {
      const hashOTP = await bcrypt.hash(OTP, saltRounds);
      await Otp.create({
        email,
        otpCode: hashOTP,
      });
      return { code: 1, otp: OTP };
    } catch (error) {
      console.log(error);
      return { code: 0 };
    }
  },
  verify: async ({ otp, email }) => {
    try {
      //raw: true nó không còn là đối tượng sequelize nữa nhưng sẽ rút gọn dữ liệu và khi truy vấn sẽ không lấy đối tượng này ra truy vấn được
      const otpHolder = await Otp.findAll({ where: { email }, order: [['createdAt', 'DESC']], raw: true });
      if (!otpHolder.length)
      throw new customError(StatusCodes.UNPROCESSABLE_ENTITY, "Email does not exist",{EC:101});
      console.log("otp"+otp)
      const lastOtp = otpHolder[0];
      console.log(otpHolder)

      const isMatch = await bcrypt.compare(otp, lastOtp.otpCode);
      if (!isMatch) {
        if (lastOtp.attempts + 1 >= 3) {
          throw new customError(StatusCodes.UNPROCESSABLE_ENTITY, "OTP entry count exceeded",{EC:102});
        }
        await Otp.update(
          { attempts: lastOtp.attempts + 1 },
          { where: { id: lastOtp.id } }
        );
        throw new customError(StatusCodes.UNPROCESSABLE_ENTITY, "Incorrect OTP code",{EC:103});
      }
      return {EC:1, EM:"success"};
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
};
module.exports = otpService;