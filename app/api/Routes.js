


import {db} from '../db';



module.exports.Routes = {

  /*
  ** GET request for the main map screen.
  */
  GET_map: () => {

    return {

      // kept in JSON format in case we need to return future data
      entrances:
        db.ref('Entrances').once('value').then( snap => {
          // returns a Promise
          return snap.val()
        }),

    };

  },

  GET_Add: function(req) {

    let x = "This will be the add text";
    // navigate to the screen using x as the response data being passed
    // from the server to the screen.
    req.navigate('Add', {data: x});
  },


}
