var baseURL = 'https://accessu-c0933.firebaseapp.com/api/v2';

module.exports.Routes = {
  /*
   ** GET request for the main map screen.
   */
  GET_map: () => {
    return fetch(baseURL + '/locations')
      .then(response => response.json())
      .then(function(data) {
        return data;
      })
      .catch(error => {
        console.error(error);
      });
  },

  /*
   ** getting a specific id and return a json object of that entrance
   */
  GET_map_with_id: entranceID => {
    return fetch(baseURL + entranceID)
      .then(response => response.json())
      .then(function(data) {
        return data;
      })
      .catch(error => {
        console.error(error);
      });
  },

  /*
   ** add an location data to the database.
   */
  POST_Add_Location: data => {
    return fetch(baseURL + '/location', {
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        return response;
      })
      .catch(error => alert(JSON.stringify(error)));
  },

  /*
   ** add an entrance data to the database.
   */
  POST_Add_Entrance: data => {
    return fetch(baseURL + '/entrance', {
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        return response;
      })
      .catch(error => alert(JSON.stringify(error) + 'error here'));
  },

  /*
   ** add an image for a location to the database
   */
  POST_Add_Location_Image: (data, locationID) => {
    fetch(baseURL + '/images/location/' + locationID, {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(response => {
        return response;
      })
      .catch(error => {
        alert(JSON.stringify(error) + ' error adding location');
      });
  },

  /*
   ** add an image for a entrance to the database
   */
  POST_Add_Entrance_Image: (data, entranceID) => {
    fetch(baseURL + '/images/entrance/' + entranceID, {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(response => {
        return response;
      })
      .catch(error => alert(JSON.stringify(error)));
  }
};
