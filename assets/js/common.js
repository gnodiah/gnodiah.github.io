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
			yday = timeToDate(new Date(year, 11, 31) - new Date(year, 0, 1)),
			bday = timeToDate(new Date(year, month - 1, date) - new Date(1990, 10, 1));

	var byday = 0, age = 0;
	if(month >= 11 && date >= 1) {
		byday = timeToDate(now - new Date(year, 10, 1, 12));
		age = year - 1990;
	} else {
		byday = timeToDate(now - new Date(year - 1, 10, 1, 12));
		age = (year - 1) - 1990;
	}

	switch(type) {
		case 1:
			return "Page <strong>" + day + "</strong> of " + yday + ", Chapter <strong>" + year + "</strong>";
		case 2:
			return (age + byday/yday).toFixed(9);
		case 3:
			return "Page <strong>" + bday + "</strong> of Undefined" + ", Chapter <strong>Lifetime</strong>";
		case 4:
			return (timeToDate(now - new Date(year, 0, 1)) / yday * 100).toFixed(7) + " %";
		default:
			return now;
	}
}

$(document).ready(function() {
	$(".1stPage .1stSlide").html(timeLost(1));
	$(".1stPage .2ndSlide").text(timeLost(4));
	$(".2ndPage .1stSlide").html(timeLost(3));

	function setAge() {
		$(".1stPage .2ndSlide").text(timeLost(4));
		$(".2ndPage .2ndSlide").text(timeLost(2));
	}
	setInterval(setAge, 60);
});

