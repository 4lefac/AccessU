


// reference to db
import { db } from '../db';

module.exports.Routes = {

  Add: function(req) {

    let x = "This will be the add text";
    // navigate to the screen using x as the response data being passed
    // from the server to the screen.
    req.navigate('Add', {data: x});
  },

  map: function() {

  }

}
