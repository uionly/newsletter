var mongoose  = require('mongoose');
var moment = require('moment');
var Schema    = mongoose.Schema;



var NewsletterSchema = new Schema({
    created:{type: Date, default:new Date()},
    date:{type:String},
    headerTitle:{type:String},
    edition:{type:String},
    headerLogo:{type:String},
    headerBanner:{type:String},
    IndustryWatch:[{
        title:{type:String},
        desc:{type:String},
        Img:{type:String},
        link:{type:String}
    }],
    Highlights:[{
        Img:{type:String},
        desc:{type:String}
    }],
    UpcomingEvents:[{
        title:{type:String},
        date:{type:String},
        venue:{type:String},
        Img:{type:String},
        desc:{type:String},
        link:{type:String}
    }],
    footer:{type:String}
})







var Newsletter = mongoose.model('Newsletter', NewsletterSchema);

module.exports = Newsletter;
