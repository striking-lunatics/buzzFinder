const db = require('../db');
const request = require('request');


const Brewery = module.exports;


Brewery.create = function(breweryId, userId) {

	return joinInsert(breweryId, userId)
		.then(function() {

			return db('breweries').insert({id: breweryId, likes: 1})
				.then(function() {
					return db('breweries').select('*').where('id','=', breweryId)
				})

		})
		.catch(function(err) {

			return err;
		})		
}

Brewery.incrementLikes = function(breweryId, userId) {

	return joinInsert(breweryId, userId)
		.then(function() {

			return db('breweries').select('*').where('id','=', breweryId) 
				.then(function(data) {
					var currentLikes = data[0].likes; 
					// console.log("showing current likes:", currentLikes);
					return db('breweries').where('id', '=', breweryId) 
					.update({likes: currentLikes + 1})
						.then(function(data) {
							// console.log("inside update:", data);
							return db('breweries').select('*').where('id','=', breweryId)
						})
				})

		})
		.catch(function(err) {

			return err;
		})

}


//Helper function called at the end of app.post('/login').
//Upon a successful login it retrieves ids of the user's previously liked breweries and then
//does api calls for each one, returning an array of promised brewery data
Brewery.retrieveLikedBreweries = function(userId) {

   return getLikedBreweries(userId)
      .then(function(likedBreweries) {

         var likedBreweryData = likedBreweries.map(function(brewery) {

            return new Promise(function(resolve, reject) {

               //console.log("showing id:", breweries[index].id);
               var url = 'http://api.brewerydb.com/v2/brewery/' + brewery.id + '/?key=da506aecce47e548b1877f8c6f9be793'

               request(url, function(error, response, body) {

                  if (!error && response.statusCode == 200) {
                     var data = JSON.parse(body);
                     // console.log("showing likes inside new promise:", brewery.likes);
                     // console.log("data from api brewery id call:", data.data);
                     data.data.likes = brewery.likes;
                     resolve(data.data);
                  }
               })

            });

         })
         return Promise.all(likedBreweryData);
      })
}


//Helper function from inside app.post('/location') which takes the list of area breweries
//from the api call and then searches the database to see if they have been liked by any users
//in the past.  It then attaches a 'likes' property to the brewery data object before sneding back 
//data to the client
Brewery.includeBreweryLikes = function(companies) {

   var breweriesWithLikes = companies.map(function(company) {

      return db('breweries').select('*').where('id', '=', company.brewery.id)
         .then(function(rows) {

            //console.log("showing rows:", rows);

            if (rows.length === 0) {
               company.brewery.likes = 0;
            } else {
               company.brewery.likes = rows[0].likes;
            }
            return company;
         })
   })
   return Promise.all(breweriesWithLikes);
}


Brewery.findById = function(breweryId) {

	return db('breweries').select('*').where('id','=', breweryId)
} 



function getLikedBreweries(userId) {

	return db('brewery_likes').select('brewery_id').where("user_id", "=", userId)
		.then(function(breweries) {
			var breweryIds = breweries.map((brewery) => brewery.brewery_id); 
			// console.log("showing after mapped:", breweryIds);
			return db.select('*').from('breweries').whereIn('id', breweryIds)
		})
}


function joinInsert(breweryId, userId) {

	return db('brewery_likes').insert({brewery_id: breweryId, user_id: userId})
}

