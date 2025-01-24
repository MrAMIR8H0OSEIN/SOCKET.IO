const moment = require('moment-jalaali');
moment.loadPersian();
exports.chatFormat = (message,user)=>{
    return{
        text: message,
        user,
        time: moment().format('a mm-hh jDD jMMMM jYYYY')
    }
}