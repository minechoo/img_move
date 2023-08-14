class Sequence {
	#defOpt = { imgNum: 200, maskName: 'mask', imgURL: 'img/pic', imgType: 'jpg' };
	constructor(selector, opt) {
		if (!selector) return console.error('선택자는 필수 입력항목입니다.');
		const resultOpt = { ...this.#defOpt, ...opt };
		this.target = selector;
		this.num = resultOpt.imgNum;
		this.maskName = resultOpt.maskName;
		this.imgURL = resultOpt.imgURL;
		this.imgType = resultOpt.imgType;
		this.imgDOM = this.createImgs(this.target, this.num);
		this.showMask();
		window.addEventListener('mousemove', (e) => this.matchMove(this.imgDOM, this.num, e));
		Object.freeze(this);
	}

	createImgs(target, num) {
		const frame = document.querySelector(target);
		let imgs = '';
		for (let i = 0; i < num; i++) {
			imgs += `<img src='${this.imgURL}${i}.${this.imgType}' />`;
		}
		frame.innerHTML = imgs;
		return frame.querySelectorAll('img');
	}

	showMask() {
		let count = 0;
		const mask = document.createElement('aside');
		mask.classList.add(this.maskName);
		mask.style.transitionDuration = '0.5s';
		const delay = this.convertSpeed(mask);
		mask.innerHTML = `<p>0%</p><div class="bar"></div>`;
		document.body.append(mask);

		this.imgDOM.forEach((img) => {
			img.onload = () => {
				count++;
				const percent = parseInt((count / this.num) * 100);
				mask.querySelector('p').innerHTML = percent + '%';
				mask.querySelector('.bar').style.width = percent + '%';

				if (percent === 100) {
					console.log('이미지 소스 로딩 완료');
					mask.classList.add('off');

					setTimeout(() => {
						mask.remove();
					}, delay);
				}
			};
			img.onerror = () => {
				console.log('이미지 출력 중 에러');
			};
		});
	}

	matchMove(arrEl, num, e) {
		const percent = parseInt((e.clientX / window.innerWidth) * num);
		for (const img of arrEl) img.style.display = 'none';
		arrEl[percent].style.display = 'block';
	}

	convertSpeed(el) {
		return parseFloat(getComputedStyle(el).transitionDuration) * 1000;
	}
}
