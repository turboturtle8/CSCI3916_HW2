/***CSC3916 HW2
 ***file: db.js
 ***Desc: Web API scaffolding for Movie API
 *** Full disclosure: I retyped exactly what is in Shawn's hw2 git repo. I'm still learning all of this
 *** so I didn't copy paste, but it is an exact copy*/


var crypto = require('crypto');

module.exports = function () {
    return {
        userList [],
        /*save user inside this array as fake db*/

        save: function (user) {
            user.id = crypto.randomBytes(20).toString('hex');  //quick gen of user id??
            this.userList.push(user);
            return 1;
        },

        /*retrieve a movie with a given id or return all the movies if the id is undefined*/
        find: function (id) {
            if (id) {
                return this.userList.find(function (element) {
                    return element.id === id;
                });
            }
            else {
                return this.userList;
            }
        },
        findOne: function (name) {
            if (name) {
                return this.userList.find(function (element) {
                    return element.username === name;
                });
            }
            else {
                return this.userList;
            }
        },
        /*Delete movie with given id*/
        remove: function (id) {
            var found = 0;
            this.userList = this.userList.filter(function (element) {
                if (element.id === id) {
                    found = 1;
                }
                else {
                    return element.id !== id;
                }
            });
            return found;
        },
        /*Update movie with the given id*/
        update: function (id.user){
        var userIndex = this.userList.findIndex(function (element) {
            return element.id === id;
        });
        if (userIndex !== -1) {
            this.userList[userIndex].username = user.username;
            this.userList[userIndex].password = user.password;
            return 1;
        }
        else {
            return 0;
        }
    }
};
};