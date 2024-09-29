import express from "express";
import cors from "cors";
import  mongoose  from "mongoose";
import UserModel from "./models/User.js";
import MovieModel from "./models/MoviesData.js";
import Contact from "./models/Contact.js";
import Dashboard from "./models/Dashboard.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors(
 {
credentials:true,
origin:[process.env.ORIGIN1,process.env.ORIGIN2]
 }
));
app.use(express.json());



const connectDb = async () => {
try {
await mongoose.connect(process.env.MONGODB_URL);
console.log("connected to database");
    
} catch (error) {
console.log("error is here does not connected to mongodb", error);
    
}
};
connectDb();



const PORT = 5000;

//api 

app.get("/health", (req, res) => {
  res.json({ status: "All Good!" });
});




app.post("/register", (req, res) => {
UserModel.create(req.body)
.then((users) => res.json(users))
.catch((err) => res.json(err));
});



app.post("/login", (req, res) => {
 const { email, 
password } = req.body;
 UserModel.findOne({ email: email }).then((user) => {
if (user)
  
  {
if (user.password === password) {
res.json("Success");
 } else {
 res.json("The password is incorrect❌");
   }
} else {
res.json("No user Existed");
 }
 });
});



app.post(`/moviedata`, async (req, res) => {
const { img,
  title,
  content, 
  genre } = req.body;


if (!title || !content || !img || !genre) {
return res.json({
Success: false,
message: "fields are required",
data: null,
 });
}

const newMovie = await MovieModel.create({
img: img,
title: title,
content: content,
genre: genre,
});

res.json({
Success: true,
message: "movie added successfully",
 data: newMovie,
});
});

app.get("/moviedata",async (req,res)=>{
const movie =await MovieModel.find();
res.json({
success: true,
message: "data fetched successfully",
data: movie,
})
})

app.get("/moviedata/:id", async (req, res) => {
const { id } = req.params;
const note = await MovieModel.findOne({
 _id: id,
 });

res.json({
success: true,
message: "data fetched successfully",
data: note,
  });
});




app.post("/contacts", async(req, res) => {
  const {firstName,
 lastName,
 email,
 address, 
 message } 
 = req.body;



if(!firstName){
return res.json({
success: false,
message:"First name is required",
data: null
})
 }

if(!lastName){
return res.json({
success: false,
message:"Last name is required",
data: null
})
  }

if(!email){
return res.json({
success: false,
message:"Email is required",
data: null
})
  }

if(!message){
return res.json({
success: false,
message:"Message is required",
 data: null
 })

}

const newContact = await Contact.create({
 "firstName": firstName,
 "lastName": lastName,
 "email": email,
 "address": address,
 "message": message
  })

 res.json({
  success: true,
   message: "Contact added successfully",
   data: newContact
  })
})




app.post('/dashboard', async (req, res) => {
const { name, 
genre, 
duration,
ratings } = req.body;

 try {
 const newDashboardEntry = await Dashboard.create({ name, genre, duration, ratings });
 res.json({
 success: true,
 message: 'Dashboard entry created successfully',
 data: newDashboardEntry
   });
  } 
  
catch (error) {
res.status(500).json({
success: false,
message: 'An error occurred while creating dashboard entry',
error: error.message
});
}

});


//get api
app.get('/dashboard', async (req, res) => {
try {
const dashboardEntries = await Dashboard.find();
res.json({
success: true,
message: 'Dashboard entries fetched successfully',
 data: dashboardEntries });
 
} 
  
catch (error) {
 res.status(500).json({
success: false,
message: 'An error occurred while fetching dashboard entries',
error: error.message
 });
}});


app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}.`);
});


