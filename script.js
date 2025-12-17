document.addEventListener('DOMContentLoaded', function(){
	// set footer year
	const yearEl = document.getElementById('year');
	if(yearEl) yearEl.textContent = new Date().getFullYear();

	// slideshow logic: cycle .slide elements
	const slides = Array.from(document.querySelectorAll('.slide'));
	if(slides.length){
		let idx = 0;
		slides.forEach((s,i)=> s.classList.toggle('active', i===0));

		const next = ()=>{
			slides[idx].classList.remove('active');
			idx = (idx + 1) % slides.length;
			slides[idx].classList.add('active');
		};

		// pre-load images
		slides.forEach(s=>{
			const bg = s.style.backgroundImage.replace(/url\(|\)|\"|\'/g,'');
			const img = new Image(); img.src = bg;
		});

		// change every 5s
		setInterval(next, 3000);
	}

	// navbar shadow on scroll
	const nav = document.querySelector('.navbar');
	let lastScroll = window.scrollY;
	const onScroll = ()=>{
		const y = window.scrollY;
		if(nav){
			if(y > 20) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
		}
		lastScroll = y;
	};
	window.addEventListener('scroll', onScroll, {passive:true});
	onScroll();


	// Reveal items (service cards and features) into view using IntersectionObserver
	const revealItems = document.querySelectorAll('.service-card, .feature');
	if(revealItems.length && 'IntersectionObserver' in window){
		const obs = new IntersectionObserver((entries, observer)=>{
			entries.forEach(entry=>{
				if(entry.isIntersecting){
					entry.target.classList.add('in-view');
					observer.unobserve(entry.target);
				}
			});
		},{root:null,rootMargin:'0px 0px -10% 0px',threshold:0.12});

		revealItems.forEach((el, i)=>{
			// subtle stagger
			el.style.transitionDelay = (i * 60) + 'ms';
			obs.observe(el);
		});
	}
});

