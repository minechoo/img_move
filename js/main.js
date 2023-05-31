const mask = document.querySelector('aside');
const delay = convertSpeed(mask);
const target = 'figure';
const num = 200;
let count = 0;

const imgDOM = createImgs(target, num);
//동적 imgDOM 생성
imgDOM.forEach((img) => {
	img.onload = () => {
		count++;
		const percent = parseInt((count / 200) * 100);
		mask.querySelector('p').innerHTML = percent + '%';
		mask.querySelector('.bar').style.width = percent + '%';
		if (percent === 100) {
			console.log('이미지 수스 로딩 완료');
			mask.classList.add('off');

			setTimeout(() => {
				mask.remove();
			}, delay);
		}
	};
	img.onerror = () => {
		console.log('이미지 출력중 에러');
	};
});

//마우스 무브시 포인터 좌표값 200분율로 변경
window.addEventListener('mousemove', (e) => matchMove(imgDOM, 200, e));

//백분율 구하는 공식
//현재수치 / 전체 수치 * 100
//마우스포인터 위치  / 현재 브라우저 넓이값 * 100(이미지갯수)

function createImgs(target, num) {
	const frame = document.querySelector(target);
	let imgs = '';
	for (let i = 0; i <= num; i++) {
		imgs += `<img src="img/pic${i}.jpg">`;
	}
	frame.innerHTML = imgs;

	return frame.querySelectorAll('img');
}

function matchMove(arrEL, num, e) {
	const percent = parseInt((e.clientX / window.innerWidth) * num);
	console.log(percent);

	for (const img of arrEL) img.style.display = 'none';
	arrEL[percent].style.display = 'block';
}

function convertSpeed(el) {
	//const item = document.querySelector(el);
	return parseFloat(getComputedStyle(el).transitionDuration) * 1000;
}
