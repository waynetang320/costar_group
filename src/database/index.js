'use strict';
const { mapKeys } = require('lodash');
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    try{
        const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
        return mockDBCall(dataAccessMethod);
    }catch{
        console.log("getUsers function error");
    } 
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        try{
            let names = [] ,
                userAndCountMap =  new Map(),
                /*
                    key: user name
                    value: {age, id}
                */ 
                usersByIdMap = new Map();   
                /*
                    key: age
                    value: {count for the same age,  user id array}     // user id array: if two users have same name, but user id is different, we save in the array
                */ 

            _.map(db.itemsOfUserByUsername, (value, key)=>{ 
                if(value.indexOf(item)>-1) names.push(key);
            })
            
            _.map(db.usersById, (value, key)=>{ 
                    usersByIdMap.set(value.username,{id:key,age:value.age})
            })
            _.map(names,(value)=>{
                if(userAndCountMap.has(usersByIdMap.get(value).age) && userAndCountMap.get(usersByIdMap.get(value).age).id.indexOf(usersByIdMap.get(value).id) == -1){
                    let idArray = userAndCountMap.get(usersByIdMap.get(value).age).id;
                    idArray.push(usersByIdMap.get(value).id);
                    userAndCountMap.set(usersByIdMap.get(value).age, {count:userAndCountMap.get(usersByIdMap.get(value).age).count+1,id:idArray});
                }else{
                    userAndCountMap.set(usersByIdMap.get(value).age,{count:1,id:[usersByIdMap.get(value).id]});
                }
            })
            return Array.from(userAndCountMap, ([age, value]) => {return {age:age, value:value.count}}).sort((a,b)=> {return a.age - b.age});
        }catch{
           console.log("getListOfAgesOfUsersWith  function error");
        }
    }
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith
};
