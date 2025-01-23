const users = [];

exports.users = users;

exports.addUser = (id,username,room)=>{
    users.push({ id,username,room });
}

exports.deleteUser = (id)=>{
    const index = users.indexOf(users.find(f=>f.id == id));
    users.splice(index,1);
}

exports.findUser = (id)=>{
    return users.find(f=>f.id == id);
}