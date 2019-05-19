import { AsyncStorage } from "react-native";
USER_KEY = "default";

module.exports.Auth = {
    /*
    ** Handles what happens when you sign in
    */
    signIn: (email, password) => {
        valid = false;
        if (email == 'Buckeye.1@osu.edu' && password == 'Buckeye') {
            USER_KEY = email;
            valid = true;
        }
        return new Promise((resolve, reject) => {
            if (valid) {
                AsyncStorage.setItem("LoggedInStatus", "true")
                    .then(resolve(true))
                    .catch(err => reject(err));
            } else {
                AsyncStorage.setItem("LoggedInStatus", "false")
                    .then(resolve(false))
                    .catch(err => reject(err));
                resolve(false);
            }
        }).catch(err => reject(err));
    },
    /*
    ** Check if a user is signed in
    */
    isSignedIn: () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem("LoggedInStatus")
                .then(res => {
                    if (res === "true") {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }).catch(err => reject(err));
            //.catch(err => reject(err));
        });
    },

    /*
    ** Handles what happens when you sign out
    */
    SignOut: () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem("LoggedInStatus", "false").then(res => {
                alert("you're signed out I havent figured out how to hide the side menu yet lol");
                resolve(true);
            }).catch(err => reject(err));
        })
    },

    /*
    ** Signs up a user
    */
    SignUp: (firstName, lastName, email, password) => {

    },
    /*
    ** Send reset email
    */
    resetEmail: (email) => {

    }
}