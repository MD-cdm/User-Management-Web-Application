const express = require('express');
const app = express();
const path =require('path');
const userModel =require('./models/user');


app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

//make a route 
app.get('/',(req,res)=>{
    res.render("index");
})


//make a read Route
app.get('/read',async(req,res)=>{
     const users = await userModel.find()
    res.render("read", {users});
})



// make create route
app.post('/create', async(req,res)=>{
  const {name,email ,image}= req.body;

   const createdUser = await userModel.create({
    name,
    email,
    image
  })
  res.redirect("/read");
  
})


//make a delete Route
app.get('/delete/:id',async(req,res)=>{
    const users = await userModel.findOneAndDelete({_id: req.params.id});
   res.redirect("/read");
})



//make a edit Route 
app.get('/edit/:userid',async(req,res)=>{
  const user = await userModel.findOne({_id: req.params.userid});
 res.render("edit",{user});
})


//make a update Route 
app.post('/update/:userid',async(req,res)=>{
  const {image, name, email} = req.body;
  const user = await userModel.findOneAndUpdate({_id: req.params.userid},{image,name,email},{new:true});
 res.redirect("/read");
})


app.listen(3000);
