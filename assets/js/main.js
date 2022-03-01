var animation = anime({ targets: '.shape' });

function start_animation() {
	var animation_type = document.getElementById('background_animation').value;

	setup(0);
	set_display('visible');

	switch (animation_type)
	{
		case "floating":
			floating();
			break;
		case "climbing":
			climbing();
			break;
	}
}

function pause_animation() {
	setup(1000);
}

function stop_animation() {
	setup(1000);
	set_display('hidden');
}

function set_display(display_value) {
	const list = document.getElementsByClassName('shape');
	for (var i=0; i<list.length; i++) {
		list[i].style.visibility = display_value;
	}
}

function setup(duration) {
	animation.pause();
	animation = anime({
		targets: '.shape',
		duration: duration,
		opacity: 1,
		bottom: '-' + window.innerHeight/4 + 'px',
		left: function() {
			return (anime.random(0, window.innerWidth) + 'px');
		},
	});
}

function climbing() {
	setup(0);
	animation = anime({
		targets: '.shape',
		bottom: function() {
				return anime.random(window.innerHeight/4, window.innerHeight/2) + 'px';
		},
		scale: function() {
			return anime.random(0.5, 1.25);
		},
		delay: anime.stagger(1000),
		rotate: anime.random(-45, 45),
		opacity: [1, 0],
		easing: 'linear',
		duration: 2000,
		complete: climbing
	});
}

function floating() {
	animation = anime({ targets: '.shape',
		bottom:
		function() {
			console.log();
			return anime.random(0, window.innerHeight) + 'px';
		},
		left: function() {
			return (anime.random(0, window.innerWidth - window.innerHeight/4) + 'px');
		},
		scale: function() {
			return anime.random(0.5, 1.25);
		},
		skew: function() {
			return anime.random(-30, 30);
		},
		delay: anime.stagger(400),
		duration: 3000,
		complete: floating
	});
}

// Fetch Github Info

async function github_events() {
	try {
		const r = await fetch("https://api.github.com/users/HTsuyoshi/events");
		const d = await r.json();
		let i = 1;
		while (i <= d.length) {
			if (d[i].type == "PushEvent")
				break;
			i++;
		}

		var img = document.createElement("a");
		img.target = '_blank';
		img.href = 'https://www.github.com/' + d[i].actor.login;
		img.alt = 'avatar';
		var imgTag = document.createElement("img");
		imgTag.src = "https://avatars.githubusercontent.com/u/60109663?v=4";
		img.appendChild(imgTag);
		var status = document.createElement("span");

		var title = document.createElement("div");
		title.innerHTML = 'Last activity';
		title.id = 'title';
		status.appendChild(title);

		var repo = document.createElement("div");
		repo.innerHTML = 'Repo: ';
		repo.id = 'repo';
		var repoLink = document.createElement("a");
		repoLink.innerHTML = d[i].repo.name;
		repoLink.href = 'https://www.github.com/' + d[i].repo.name;
		repoLink.target = '_blank';
		repo.appendChild(repoLink);
		status.appendChild(repo);

		var msg = document.createElement("div");
		msg.innerHTML = 'commit: ' + d[i].payload.commits[0].message;
		msg.id = 'message';
		status.appendChild(msg);

		var date = document.createElement("div");
		date.innerHTML = 'updated: ' + await last_mod(d[i].created_at);
		date.id = 'date';
		status.appendChild(date);

		var action = document.createElement("div");
		action.innerHTML = 'action: ' + d[i].type;
		action.id = 'action';
		status.appendChild(action);

		var author = document.createElement("div");
		author.innerHTML = 'author: ';
		author.id = 'author';
		var authorLink = document.createElement("a");
		authorLink.innerHTML = d[i].actor.display_login;
		authorLink.href = 'https://www.github.com/' + d[i].actor.display_login;
		authorLink.target = '_blank';
		author.appendChild(authorLink);
		status.appendChild(author);

		var gitTag = document.getElementById("github-info");
		gitTag.innerHTML = '';
		gitTag.appendChild(img);
		gitTag.appendChild(status);

		return d;
	} catch(e) {
		console.log("Error fetching the data: " + e);
		document.getElementById("content").innerHTML = "Fetching Error :(";
	}
}

async function last_mod(lastDate)
{
	try {
		const now = new Date();
		const lastYear = parseInt(lastDate.split('T')[0].split('-')[0]);
		if (now.getUTCFullYear() - lastYear > 0)
		{
			if (now.getUTCFullYear() - lastYear == 1) return 'last year';
			return ((now.getUTCFullYear() - lastYear).toString() + ' years ago');
		}

		const lastMonth = parseInt(lastDate.split('T')[0].split('-')[1]);
		if (now.getUTCMonth() - lastMonth > 0)
		{
			if (now.getUTCMonth() - lastMonth == 1) return 'last month';
			return ((now.getUTCMonth() - lastMonth).toString() + ' months ago');
		}

		const lastDay = parseInt(lastDate.split('T')[0].split('-')[2]);
		if (now.getUTCDate() - lastDay > 0)
		{
			if (now.getUTCDate() - lastDay == 1) return 'Yesterday';
			return ((now.getUTCDate() - lastDay).toString() + ' days ago');
		}

		const lastHour = parseInt(lastDate.split('T')[1].split(':')[0]);
		if (now.getUTCHours() - lastHour > 0)
		{
			if (now.getUTCHours() - lastHour == 1) return '1 hour ago';
			return ((now.getUTCHours() - lastHour).toString() + ' hours ago');
		}

		const lastMinute = parseInt(lastDate.split('T')[1].split(':')[1]);
		if (now.getUTCMinutes() - lastMinute > 0)
		{
			if (now.getUTCMinutes() - lastMinute == 1) return '1 minute ago';
			return ((now.getUTCMinutes() - lastMinute).toString() + ' minutes ago');
		}
		else
		{
			return 'now';
		}
	} catch (e) {
		console.log('Error while parsing date: ' + error);
	}
}

const d = github_events()
