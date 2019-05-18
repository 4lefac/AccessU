
var baseURL = 'https://accessu-c0933.firebaseapp.com/api/v2';



module.exports.Routes = {

  /*
  ** GET request for the main map screen.
  */
  GET_map: () => {
    return fetch(baseURL + '/locations')
      .then((response) => response.json())
      .then(function (data) {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });

  },
  //getting a specific id and return a json object of that entrance
  GET_map_with_id: (entranceID) => {
    return fetch(baseURL + entranceID)
      .then((response) => response.json())
      .then(function (data) {
        return data
      })
      .catch((error) => {
        console.error(error);
      });
  },

  //add an entrance data to the database. data has to be a json object or string doens't matter
  POST_Add: (data) => {
    fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => alert(JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  }
}
