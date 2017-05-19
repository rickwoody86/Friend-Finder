// Data js file
// =============================================================

module.exports = function(){

	 this.FriendsList = function(){

	 	//Default Users
	 	var people = [{"name":"Hulk", "img":"/img/hulk.jpg", "scores": ["5","5","3","1","2","4","1","3","4","2"]},
	 					{"name":"Deadpool", "img":"/img/deadpool.jpg", "scores": ["2","4","1","3","4","1","5","5","2","3"]},
	 					{"name":"Magneto", "img":"/img/magneto.jpg", "scores": ["3","1","2","5","2","2","5","1","2","5"]},
	 					{"name":"Black Cat", "img":"/img/blackcat.jpg", "scores": ["5","2","4","3","2","4","3","1","2","4"]},
	 					{"name":"Rogue", "img":"/img/rogue.jpg", "scores": ["1","2","4","3","4","1","3","3","2","2"]},
	 					{"name":"Pheonix", "img":"/img/pheonix.jpg", "scores": ["3","2","2","5","4","5","3","3","5","5"]}];

	 	//Store friend into array
	 	this.storeFriend = function (friend){
	 		people.push(friend);
	 	}

	 	//Return array of friends
	 	this.getFriends = function(){
	 		return people;
	 	}

	 }

}