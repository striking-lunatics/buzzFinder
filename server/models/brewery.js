var db = require('../db');

// var util = require('../../lib/utility');
// var crypto = require('crypto');


var Brewery = module.exports;

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




	// return db('breweries').select('*').where('id','=', breweryId) 
	// 	.then(function(data) {
	// 		var currentLikes = data[0].likes; 
	// 		// console.log("showing current likes:", currentLikes);
	// 		return db('breweries').where('id', '=', breweryId) 
	// 		.update({likes: currentLikes + 1})
	// 			.then(function(data) {
	// 				// console.log("inside update:", data);
	// 				return db('breweries').select('*').where('id','=', breweryId)
	// 			})
	// 	})
}

Brewery.findById = function(breweryId) {

	return db('breweries').select('*').where('id','=', breweryId)
} 


Brewery.getLikedBreweries = function(userId) {

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



// Link.all = function () {
//   return db('links').select('*')
// }

// Brewery.create = function (incomingAttrs) {
//   // Copy to avoid mutation
//   var attrs = Object.assign({}, incomingAttrs)

//   var titlePromise = attrs.title
//     ? Promise.resolve(attrs.title)
//     : util.getUrlTitle(attrs.url)

//   return titlePromise
//     .then(function (title) {

//       attrs.title = title
//       attrs.visits = 0

//       // Create shortlink token
//       var shasum = crypto.createHash('sha1');
//       shasum.update( attrs.url );
//       attrs.code = shasum.digest('hex').slice(0, 5);

//       return db('links').insert(attrs)
//     })
//     .then(function (results) {
//       attrs.id = results[0]
//       return attrs
//     })
// }

// Link.findByUrl = function (url) {
//   return db('links').where({ url: url }).limit(1)
//     .then(function (rows) {
//       return rows[0]
//     })
// }

// Link.findByCode = function (code) {
//   return db('links').where({ code: code }).limit(1)
//     .then(function (rows) {
//       return rows[0]
//     })
// }


