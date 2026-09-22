const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {

  const { name, email, password, confirmPassword } = req.body;

   if( !name || !email || !password || !confirmPassword ){
   return res.status(400).json({
      message:"All fields are required"
    })
  }

  if(password !== confirmPassword){
    return res.status(400).json({
      message:"Passwords do not match"
    })
  }

  const isUserExist = await userModel.findOne({
    email
  })

   if(isUserExist){
    return res.status(400).json({
      message: "User already exists"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password:hashedPassword,
  })

   const token = jwt.sign({
    _id:user._id,
    role:user.role
  },process.env.JWT_SECRET)

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

   return res.status(201).json({
    message: "Registration successful",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
}

module.exports.login = async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {
  return res.status(400).json({
    message: "Email and password are required"
  });
}
  
  const user = await userModel.findOne({
    email
  })

  if(!user){
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }

  const isPasswordValid = await bcrypt.compare(password,user.password);

  if(!isPasswordValid){
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }

  const token = jwt.sign({
    _id:user._id,
    role:user.role
  },process.env.JWT_SECRET)

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });


 return res.status(200).json({
    message: "Login successful",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });


}

module.exports.getMe = async (req,res) =>{
  const user = await userModel.findById(req.user._id)
  res.status(200).json({
    message:"User fetched successfully",
    user:{
      id:user._id,
      name:user.name,
      email:user.email,
      role:user.role
    }
  })
}

module.exports.logout = async (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  return res.status(200).json({
    message: "Logged out successfully"
  });
}