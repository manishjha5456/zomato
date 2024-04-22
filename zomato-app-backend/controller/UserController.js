const UserModel = require("../model/UserModel");
const UserController = {
  userDetailsSaver: async (request, response) => {
    let user_details = request.body;
    let sendData = {
      f_name: user_details.f_name,
      l_name: user_details.l_name,
      email: user_details.email,
      mobile: user_details.mobile,
      password: user_details.password,
      address: user_details.address,
    };
    let result = await UserModel.findOne({ mobile: user_details.mobile });
    if (result) {
      response.send({
        status: false,
        message: "Mobile Number Already Exist",
      });
    } else {
      new UserModel(sendData).save();
      response.send({
        status: true,
      });
    }
  },
  userLogin: async (request, response) => {
    let { userName, password } = request.body;
    let isUserExist = await UserModel.findOne({
      username: userName,
      password: password,
    });
    if (isUserExist) {
      response.send({
        status: true,
      });
    } else {
      response.send({
        status: false,
      });
    }
  },
};

module.exports = UserController;
