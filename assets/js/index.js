// Convert milliseconds to day
function timeToDate(milliseconds) {
	return milliseconds / (24*3600*1000) + 1;
}

function timeLost(type) {
	var now = new Date();
	var year = now.getFullYear(),
			month = now.getMonth() + 1,
			date = now.getDate(),
			day = timeToDate(new Date(year, month - 1, date) - new Date(year, 0, 1)),
			yday = timeToDate(new Date(year, 11, 31) - new Date(year, 0, 1));

	switch(type) {
		case 1:
			return "Page <strong style='color: #ccc'>" + day + "</strong> of " + yday + ", Chapter <strong style='color: #ccc'>" + year + "</strong>";
		case 4:
			return (timeToDate(now - new Date(year, 0, 1)) / yday * 100).toFixed(7) + " %";
		default:
			return now;
	}
}

$(document).ready(function() {
  console.log("Hi, welcome to my blog. Just click http://haydenwei.com/cn/blogs to read my blogs and know more about me.");
	$(".1stPage .1stSlide").html(timeLost(1));
	$(".1stPage .2ndSlide").text(timeLost(4));

	function setAge() {
		$(".1stPage .2ndSlide").text(timeLost(4));
	}
	setInterval(setAge, 60);
});
