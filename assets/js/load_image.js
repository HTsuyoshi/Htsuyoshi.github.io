// Load animation
function image_loaded() {
	const cards = document.getElementsByClassName('card-container');
	for (const c of cards) {
		c.children[1].onload = (e) => {
			e.target.parentNode.children[0].style.display='none';
			e.target.parentNode.children[1].style.display='block';
		}
	}
}

image_loaded();
