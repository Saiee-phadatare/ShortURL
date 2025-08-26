import Admin from '../Models/admin.js';
import jwt from 'jsonwebtoken';
import URL from '../Models/url.js'
//login 
export async function Signin (req, res){
    const { email, password } = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({success:false, message: "Enter email and password!"});
        }
        const existingUser = await Admin.findOne({email});
        if(!existingUser){
            return res.status(400).json({success:false, message: "Enter valid email!"});
        }

        if(existingUser.password !== password){
            return res.status(400).json({success:false, message: "Enter valid password!"});

        }

       const token = jwt.sign(
        { 
          userId: existingUser._id, 
          email: existingUser.email 
        },process.env.JWT_SECRET,
        { expiresIn: "1h" }
      ); 

    return res.status(200).json({ success: true, message: "Login successfully", token });

    }catch(error){
        console.error(error);
        res.status(401).json({success:false , message:"Failed to signin", err : error.message})
 }
}

// export async function getAllUrls (req, res){
//   try {
//     const urls = await URL.find().sort({ createdAt: -1 });
//     res.json(urls);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export async function getAllUrls(req, res) {
  try {
    // page & limit from query params, default page=1, limit=5
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await URL.countDocuments();
    const urls = await URL.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      urls,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
