
var baseURL = 'https://accessu-c0933.firebaseapp.com/api/v2';

module.exports.User = {
    /*
    ** GET full userInfo Json
    */
    GET_user_info: () => {

    },
    /*
    ** GET user basic Profile info
    */
    GET_profile: () => {

    },
    /*
    ** GET user setting
    */
    GET_setting: () => {

    },
    /*
    ** GET all comments for the user
    */
    GET_all_comments: () => {

    },
    /*
    ** GET average location rating
    */
    GET_rating: (locationID) => {

    },
    /*
    ** GET all added items of a user (added locations and added entrances)
    */
    GET_all_added_items: () => {

    },
    /*
    ** Post anadded comments by user to an entrance
    */
    POST_added_comment_entrance: (entranceID, comment, userID) => {

    },
    /*
    ** Post an added comment by user to a location
    */
    POST_added_comment_location: (locationID, comment, userID) => {

    },
    /*
    ** Post location rating
    */
    POST_rating: (locationID, userID) => {

    },

    /*
    ** Post a new user setting
    */
    POST_setting: (locationID, comment, userID) => {

    }
}