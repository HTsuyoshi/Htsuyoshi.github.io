const card = document.getElementsByClassName('video-card');

function hover(e) {
	const { pageX, pageY, currentTarget } = e;
	const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;
	const offsetLeftParent = currentTarget.parentNode.offsetLeft;
	const offsetTopParent = currentTarget.parentNode.offsetTop;

	const horizontal = (pageX - offsetLeft - offsetLeftParent) / clientWidth;
	const vertical = (pageY - offsetTop - offsetTopParent) / clientHeight;

	const THRESHOLD = 7;
	const rotateY = ((THRESHOLD / 2) - (horizontal * THRESHOLD)).toFixed(2);
	const rotateX = ((vertical * THRESHOLD) - (THRESHOLD / 2)).toFixed(2);

	e.target.style.transform =
		`perspective(${clientWidth}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
	e.target.parentNode.children[1].style.transform =
		`perspective(${clientWidth}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1) translateZ(12px)`;
	e.target.parentNode.children[1].style.display = 'inline';
}

function reset(e) {
	e.target.style.transform =
		`perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
	e.target.parentNode.children[1].style.display = 'none';
}

function play_stop_video(e) {
	if (e.target.paused) e.target.play();
	else e.target.pause();
}

for (const c of card) {
	c.children[0].addEventListener('mousemove', hover);
	c.children[0].addEventListener('mouseleave', reset);
	c.children[0].addEventListener('click', play_stop_video);
}
