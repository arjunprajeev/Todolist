const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
// in an Express application is used to parse URL-encoded data (form data) from the incoming HTTP request body. It is typically used when you submit forms with the application/x-www-form-urlencoded content type.
app.use(express.static('public'));//static files inside public folder

mongoose.connect("mongodb://localhost:27017/todo");
const trySchema= new mongoose.Schema({
    name:String
}); 

const item = mongoose.model("task",trySchema);//task is name of collection
const todo = new item({
    name:"Create some videos"
});
//todo.save();
const todo2 = new item({
    name:"Learn DSA"
});
//todo2.save();
const todo3 = new item({
    name:"Learn React"
});
//todo3.save();

app.get("/",function(req,res){
    async function finddata(){
        try{
            const foundItems = await item.find({});
            res.render("list",{ejes : foundItems});
        }
        catch(err){
            console.log(err);
        }
    }
    finddata();
});

app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const newItem = new item({
        name:itemName
    });
    newItem.save();
    res.redirect("/");
    // async function insertdata(){
    //     try{

    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // };
});

app.post("/delete",function(req,res){
    const checkedItemId = req.body.checkbox1?.trim();
    async function dltitem(params) {
        try{
            const deleteItem = await item.findByIdAndDelete(checkedItemId);
            console.log("Item deleted");
            res.redirect("/");
        }
        catch(err){
            console.log(err);
        }
        
    }
    dltitem();  
});

app.listen(8000,function(){
    console.log("Server started");
});
// app.get("/",function(req,res){
//     //res.send("this web page is working fine");
//     res.render("list",{ejes : items});
// });
// app.post("/",function(req,res){
//     //console.log(req.body.ele1);
//     var item= req.body.ele1;
//     items.push(item);
//     res.redirect("/");//redirect to home page
// });




// app.listen(8000,function(){
//     console.log("Server started");
// });

