import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        longURL : {
            type : String,
            required : true
        },
        shortURL : {
            type : String,
            required : true,
            unique : true,
        },
        clicks : {
            type : Number,
            default: 0,
        },
    },
    {timestamps: true}
);

const URL = mongoose.model("Url",urlSchema);
export default URL;