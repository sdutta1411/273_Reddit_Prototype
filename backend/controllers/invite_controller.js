const connection = require("../config/mysql_config");
const Community = require("../models/Community");
const UserProfile = require("../models/UserProfile");

const sendInvite = (req,res) => {
    console.log('In send invite API');
    console.log(req.body);
    
}
