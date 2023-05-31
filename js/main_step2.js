const imgDOM = createImgs('figure', 200);

window.addEventListener('mousemove', (e) => {
	const percent = parseInt((e.clientX / window.innerWidth) * 200);

	for (const img of imgDOM) img.style.display = 'none';
	imgDOM[percent].style.display = 'block';
});

//동적 이미지 생성 함수
function createImgs(target, num) {
	const frame = document.querySelector(target);
	let imgs = '';
	for (let i = 0; i < num; i++) {
		imgs += `<img src='img/pic${i}.jpg' />`;
	}
	frame.innerHTML = imgs;
	return frame.querySelectorAll('img');
}
