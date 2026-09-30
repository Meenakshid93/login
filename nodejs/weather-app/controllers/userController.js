
const userService = require('../services/userService.js');
const asyncHandler = require('../utils/asyncHandler.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtsecretkey ='my-secret-key-12345';
exports.getUsersData = asyncHandler(async(request, response) => {
        const users =  await userService.getUsers();
        response.status(200).json({
            message: 'Users Fetched Successfully',
            users: users
        });
});

exports.getUserbyId = asyncHandler(async (req,res,next) => {
const id = req.params.id;
        const users = await userService.getUserById(id)
        res.status(200).json({
            message: 'User Fetched Successfully',
            users: users
        });
   
});


exports.createEmployess = asyncHandler(async(req, res, next) => {
    const{name, email, age} = req.body;
    const newUserData =  await userService.createEmployee(name, email, age);
     res.status(202).json({
        sucess: true ,
        user: newUserData,
        message: 'User Created'
     })
});

exports.updateUsers = asyncHandler(async(req, res , next) => {
    const{name, email, age, id} = req.body;
    const updatedUser = await userService.updateUser(name,email, age, id);
    console.log(updatedUser);
    res.status(200).json({
      sucess: true,
      updatedUser: updatedUser,
      message: 'User Updated Sucessfully'
    })
});

exports.patchUser = asyncHandler(async(req, res, next) => {
    const{name, email, age, id} = req.body;
    const patchUser = await userService.patchUser(name,email, age, id);
    console.log(patchUser);
    res.status(200).json({
      sucess: true,
      updatedUserDetails: patchUser,
      message: 'User details Sucessfully Updated'
    })
  });


exports.deleteUser = asyncHandler(async(req, res, next) => {
    const id = req.params.id;
    const deletedUser = await userService.deleteUser(id);
    console.log(deletedUser);
    res.status(200).json({
      sucess: true,
      updatedUserDetails: deletedUser,
      message: 'User deleted sucessfully'
    })
});

exports.createUsers = asyncHandler(async(req, res) => {
    const{name, email , password,role} = req.body;
  const users = await userService.createUsers(name,email,password,role);
  res.status(202).json({
    sucess: 'true',
    message: 'User Created sucessfully'
  })

});


exports.loginUsers = asyncHandler(async(req,res)=> {
  const{email, password}= req.body;
  const user = await userService.loginUsers(email);
console.log(user)
  //password validation
  if(!user){
    return res.status(401).json({
      message: 'Invalid user name or password!'
    })
  }else{
      const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );
    if(!isPasswordValid){
      return res.status(401).json({
        message: 'Password is incorrect'
      })
    }
  }
  
  //generatetoken
  const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      jwtsecretkey,
      {
        expiresIn: "1h"
      }
    );
   res.status(202).json({
    sucess: 'true',
    message: 'Login sucessfully',
    token : token
  })

});

exports.getUserProfile=asyncHandler(async(req,res)=> {
  const id = req.user.userId;
  const user = await userService.getUserById(id);
   if (!user) {
    throw new error ("User not found", 404);
  }

  res.status(200).json({
    message: 'user fetched sucessfully',
    userInfo: user
  })
});


exports.deleteUserData = asyncHandler(async(req, res) => {
  console.log('...indelete')
    const id = req.params.id;
    const deletedUser = await userService.deleteUserData(id);
    console.log(deletedUser);
    res.status(200).json({
      sucess: true,
      updatedUserDetails: deletedUser,
      message: 'User deleted sucessfully'
    })
});