const moment = require('moment-jalaali');

exports.chatFormat = (message,user)=>{
    return{
        text: message,
        user,
        time: moment().format('jYYYY/jMM/jDD hh-mm a')
    }
}