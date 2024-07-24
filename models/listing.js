const { types, ref, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = Schema({
    title : String,
    description : {
        type : String,
        required : true,
    },
    image : {
        url : String,
        filename : String,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    geometry:{
        type : {
            type:String,
            enum : ["Point"],
            required : true,
        },
        coordinates: {
            type : [Number],
            required:true,
        },
    },
    category : {
        type  :String,
    }
});

listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in :listing.reviews}})
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
