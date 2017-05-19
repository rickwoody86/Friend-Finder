// API Routes
// =============================================================

var friendsDB = require("../data/friends.js")();

module.exports = function(app) { 

	var friendsList = new FriendsList();  //Get all friends in data file

	//GET that displays all people in data file
	app.get('/api/friends', function (req, res) {
		var people = friendsList.getFriends();
		res.json(people);
	});

	//POST that adds a person to friends data file and then responds with best match
	app.post('/api/friends', function (req, res) {
		var newPerson = req.body;
		friendsList.storeFriend(newPerson);
		res.json(bestFriend());
	});

	//Calculate best match from friends data file
	function bestFriend(){
		var friendArr = friendsList.getFriends(); 
		var userScore = friendArr[friendArr.length-1].scores;
		var bestMatch = {name: friendArr[0].name, img: friendArr[0].img, //Set best match to first person in list
			score: calcScores(friendArr[0].scores, userScore)};

		//Check each person in list for best match
		for(var i=1;i<friendArr.length-1;++i){
			var newScore = calcScores(friendArr[i].scores, userScore);
			if(newScore < bestMatch.score){
				bestMatch.name = friendArr[i].name;
				bestMatch.img = friendArr[i].img;
				bestMatch.score = newScore;
			}
		}
		return bestMatch;
	}

	//Calculates total score from the difference from two score arrays
	function calcScores(scoreOne, scoreTwo){
		totalScore=0;
		scoreOne.forEach(function(value,index){
			totalScore+=Math.abs(value-scoreTwo[index]);
		});
		return totalScore;
	}
}