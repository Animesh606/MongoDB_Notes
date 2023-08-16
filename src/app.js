const mongoose = require('mongoose');
//  Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/Animesh').then(console.log("connection successful")).catch((err) => {console.log(err)});
//  Creating a Schema
const schema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "name is required"],
        lowercase : true,
        trim : true,
        minlength : 2,
        maxlength : 30
    },
    roll : {
        type : Number,
        required : true,
        min : 21101104001,
        max : 21101104099,
        unique : true,           // unique is not a validator
        Validate(value){
            if(value <= 0)
                throw new Error("Roll can't be negative");
        }
    },
    department : {
        type : String,
        required : true,
        uppercase : true,
        enum : ["CSE", "IT", "ECE", "CE", "ME", "EE"]
    },
    marritalStatus : Boolean,
    date : {
        type : Date,
        default : Date.now
    }
});
//  Creating collection
const Student = new mongoose.model('Student', schema);

// //  Create document using promises
// const s1 = new Student({
//     name : "Animesh",
//     roll : 21101104018,
//     department : "CSE",
//     marritalStatus : false
// });
// s1.save();

//  Creating document using async function
const createDcoument = async () => {
    try{
        const s1 = new Student({
            name : "Sayan",
            roll : 21101104023,
            department : "CSE",
            marritalStatus : true
        });
        const s2 = new Student({
            name : "        Arnab",
            roll : 21101104024,
            department : "CSE",
            marritalStatus : true
        });
        const s3 = new Student({
            name : "Akash",
            roll : 21101104063,
            department : "cse",
            marritalStatus : false
        });
        //  Single document save
        // const result = await s1.save();
        //  Multiple documents insert
        const result = await Student.insertMany([s1, s2, s3]);
        console.log(result);
    }catch(err) {
        console.log(err);
    }
}
// createDcoument();

//  Read Document
const readDocument = async () => {
    try{
        const result = await Student.find({roll : {$gt : 21101104023}}, {name:1, _id:0}).limit(2).skip(1).sort({name : -1});
        console.log(result);
    }catch(err){
        console.log(err);
    }
}
// readDocument();

//  Update Dcoument
const updateDocument = async (_id) => {
    try {
        // const result = await Student.updateOne({_id}, {$set : {marritalStatus : false}});    // result is status of modification
        const result = await Student.findByIdAndUpdate({_id}, {$set : {marritalStatus : true}});    // result is old data
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
// updateDocument('6496cd983dd2d0131aec3f3e');

//  Delete Document
const deleteDocument = async (_id) => {
    try {
        // const result = await Student.deleteOne({_id});  //  result is status of deletion
        const result = await Student.findOneAndDelete({_id});  //  result is data which deleted
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
// deleteDocument('6496d0e42af08394913901b0');