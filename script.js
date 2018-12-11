function element(id) {
	return document.getElementById(id);
}
function getPageContent(url = String()) {
	var req = new XMLHttpRequest();
	req.open("GET", url, false);
	req.send();
	return req.responseText;
}
function Json(url = String()) {
	return JSON.parse(getPageContent(url));
}
function channelJson(part = String(), channel = String()) {
	return Json("https://www.googleapis.com/youtube/v3/channels?part=" + part + "&id=" + channel.id + "&key=AIzaSyBZuZRr7b-LpYKHl4IilXp1ZCrSh64dznc");
}
function channelJsonFromId(part = String(), id = String()) {
	return Json("https://www.googleapis.com/youtube/v3/channels?part=" + part + "&id=" + id + "&key=AIzaSyBZuZRr7b-LpYKHl4IilXp1ZCrSh64dznc");
}
function channelJsonFromName(part = String(), name = String()) {
	return Json("https://www.googleapis.com/youtube/v3/channels?part=" + part + "&forUsername=" + name + "&key=AIzaSyBZuZRr7b-LpYKHl4IilXp1ZCrSh64dznc");
}
function videoJson(part = String(), video = String()) {
	return Json("https://www.googleapis.com/youtube/v3/videos?part=" + part + "&id=" + video.id + "&key=AIzaSyBZuZRr7b-LpYKHl4IilXp1ZCrSh64dznc");
}
function videoJsonFromId(part = String(), id = String()) {
	return Json("https://www.googleapis.com/youtube/v3/videos?part=" + part + "&id=" + id + "&key=AIzaSyBZuZRr7b-LpYKHl4IilXp1ZCrSh64dznc");
}
class Channel {
	constructor(channel = String()) {
		if (channel.length == 24)
			this.id = channel;
		else
			this.id = channelJsonFromName("snippet", channel)["items"][0]["id"];
		this.lastData = {
			subs: 0,
			views: 0,
			uploads: 0
		};
		this.events = [];
		this.eventListener = setInterval(() => {
			for (var i = 0; i < this.events.length; i++) {
				switch(this.events[i].event) {
					case "subs": {
						var subs = parseInt(channelJson("statistics", this)["items"][0]["statistics"]["subscriberCount"]);
						if (subs != this.lastData.subs) {
							this.events[i].func(subs - this.lastData.subs);
							this.lastData.subs = subs;
						}
						break;
					}
					case "views": {
						var views = parseInt(channelJson("statistics", this)["items"][0]["statistics"]["viewCount"]);
						if (views != this.lastData.views) {
							this.events[i].func(views - this.lastData.views);
							this.lastData.views = views;
						}
						break;
					}
					case "uploads": {
						var uploads = parseInt(channelJson("statistics", this)["items"][0]["statistics"]["videoCount"]);
						if (uploads != this.lastData.uploads) {
							this.events[i].func(uploads - this.lastData.uploads);
							this.lastData.uploads = uploads;
						}
					}
					break;
				}
			}
		}, 1000);
	}
	name() {
		return channelJson("snippet", this)["items"][0]["snippet"]["title"];
	}
	subs() {
		return parseInt(channelJson("statistics", this)["items"][0]["statistics"]["subscriberCount"]);
	}
	views() {
		return parseInt(channelJson("statistics", this)["items"][0]["statistics"]["viewCount"]);
	}
	uploads() {
		return parseInt(channelJson("statistics", this)["items"][0]["statistics"]["videoCount"]);
	}
	on(event, func) {
		this.events.push({
			event: event,
			func: func
		});
	}
}
class Video {
	constructor(video = String()) {
		this.id = video;
		this.lastData = {
			views: 0,
			likes: 0,
			dislikes: 0,
			comments: 0
		};
		this.events = [];
		this.eventListener = setInterval(() => {
			for (var i = 0; i < this.events.length; i++) {
				switch(this.events[i].event) {
					case "views": {
						var views = parseInt(videoJson("statistics", this)["items"][0]["statistics"]["viewCount"]);
						if (views != this.lastData.views) {
							this.events[i].func(views - this.lastData.views);
							this.lastData.views = views;
						}
						break;
					}
					case "likes": {
						var likes = parseInt(videoJson("statistics", this)["items"][0]["statistics"]["likeCount"]);
						if (likes != this.lastData.likes) {
							this.events[i].func(likes - this.lastData.likes);
							this.lastData.likes = likes;
						}
						break;
					}
					case "dislikes": {
						var dislikes = parseInt(videoJson("statistics", this)["items"][0]["statistics"]["dislikeCount"]);
						if (dislikes != this.lastData.dislikes) {
							this.events[i].func(dislikes - this.lastData.dislikes);
							this.lastData.dislikes = dislikes;
						}
						break;
					}
					case "comments": {
						var comments = parseInt(videoJson("statistics", this)["items"][0]["statistics"]["commentCount"]);
						if (comments != this.lastData.comments) {
							this.events[i].func(comments - this.lastData.comments);
							this.lastData.comments = comments;
						}
						break;
					}
				}
			}
		}, 1000);
	}
	name() {
		return videoJson("snippet", this)["items"][0]["snippet"]["title"];
	}
	channel() {
		return new Channel(videoJson("snippet", this)["items"][0]["snippet"]["channelId"]);
	}
	views() {
		return parseInt(videoJson("statistics", this)["items"][0]["statistics"]["viewCount"]);
	}
	likes() {
		return parseInt(videoJson("statistics", this)["items"][0]["statistics"]["likeCount"]);
	}
	dislikes() {
		return parseInt(videoJson("statistics", this)["items"][0]["statistics"]["dislikeCount"]);
	}
	likeRatio() {
		var likeCount = parseInt(videoJson("statistics", this)["items"][0]["statistics"]["likeCount"]);
		return likeCount / (likeCount + parseInt(videoJson("statistics", this)["items"][0]["statistics"]["dislikeCount"]));
	}
	dislikeRatio() {
		var dislikeCount = parseInt(videoJson("statistics", this)["items"][0]["statistics"]["dislikeCount"]);
		return dislikeCount / (dislikeCount + parseInt(videoJson("statistics", this)["items"][0]["statistics"]["likeCount"]));
	}
	comments() {
		return parseInt(videoJson("statistics", this)["items"][0]["statistics"]["commentCount"]);
	}
	on(event, func) {
		this.events.push({
			event: event,
			func: func
		});
	}
}
var liveSources = [];
function startLive(id, func) {
	stopLive(id);
	liveSources.push({
		id: id,
		interval: setInterval(func, 1000)
	});
}
function startLive(id, func, interval) {
	stopLive(id);
	liveSources.push({
		id: id,
		interval: setInterval(func, interval)
	});
}
function stopLive(id) {
	for (i = 0; i < liveSources.length; i++) {
		if (liveSources[i].id == id) {
			clearInterval(liveSources[i].interval);
			liveSources.splice(i, 1);
		}
	}
}

// interface code

function AddChannel() {

}
function RemoveChannel() {

}
function AddVideo() {

}
function RemoveVideo() {

}