var movieTimes
const locationElement = document.getElementById("flocation")
const searchButtonElement = document.getElementById("fsearchbutton")
const resultsTableElement = document.getElementById("resultsTable")
const showVisibilitElement = document.getElementById("showDescriptionVisibility")

window.onload = async function(){
	const responce = await fetch("./showtimes.json")
	movieTimes = await responce.json()

	//populate the location selection
	var locations = []
	for(var movie in movieTimes){
		var location = movieTimes[movie].location
		if(!locations.some(function(value,index,array){return value == location})){
			locations.push(location)
			let option = document.createElement("option")
			option.setAttribute("value", location)
			option.innerText = location
			locationElement.appendChild(option)
		}
	}

}

resultsTableElement.onclick = async function(){
	//Handles a search row being clicked
	let e = window.event;
	let path = e.composedPath()
	//Find the row in the path list
	var i = 0
	while(path[i].tagName != "TR"){
		i++
	}

	drawShowDetails(path[i].getAttribute("movieid"))
}

searchButtonElement.onclick = function(){
	let date = document.forms["searchForm"]["date"].value
	let location = document.forms["searchForm"]["location"].value

	//Clear all children
	resultsTableElement.innerHTML = ""

	//change format of date so we can do direct comparisons
	date = date.replace(/-/g,"/")

	for(var moviei in movieTimes){
		var movie = movieTimes[moviei]
		if(movie.location == location & movie.date == date){
			var row = document.createElement("tr")
			row.setAttribute("movieid", movie.id)
			var titletd = document.createElement("td")
			titletd.innerText = movie.title
			var timetd = document.createElement("td")
			timetd.style = "text-align: right;"
			var timetdul = document.createElement("ul")
			timetd.appendChild(timetdul)
			for(var i in movie.times){
				var time = document.createElement("li")
				time.innerText = movie.times[i]
				timetdul.appendChild(time)
			}
			row.appendChild(titletd)
			row.appendChild(timetd)
			resultsTableElement.appendChild(row)
		}
	}
}

async function drawShowDetails(movieid){
	const mainform = document.forms["showDescription"]
	// pull the movie details
	const responce = await fetch("http://www.omdbapi.com/?i=" + movieid + "&apikey=b4d6889b")
	const movie = await responce.json("http://www.omdbapi.com/?i=" + movieid + "&apikey=b4d6889b")
	console.log(movie)

	mainform.title.value = movie.Title
	mainform.year.value = movie.Year
	mainform.genre.value = movie.Genre
	mainform.runtime.value = movie.Runtime
	mainform.director.value = movie.Director
	mainform.writer.value = movie.Writer
	mainform.actors.value = movie.Actors


	//set image
	mainform["posterImg"].setAttribute("src", "http://img.omdbapi.com/?i=" + movieid + "&apikey=b4d6889b")
	showVisibilitElement.setAttribute("class", "visible")
}