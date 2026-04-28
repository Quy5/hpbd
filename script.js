document.addEventListener('DOMContentLoaded', () => {
    const petalsContainer = document.getElementById('petals');
    const giftBox = document.getElementById('giftBoxTrigger');
    const box = document.getElementById('box');
    const revealSection = document.getElementById('reveal-section');
    const typingText = document.getElementById('typing-text');
    const revealImage = document.getElementById('reveal-image');
    const closeBtn = document.getElementById('closeBtn');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseOverlay = document.getElementById('surprise-overlay');
    const closeSurprise = document.getElementById('closeSurprise');
    const bgMusic = document.getElementById('bg-music');

    const message = "Chúc mừng sinh nhật bạn yêu! Chúc bạn tuổi mới thật nhiều niềm vui, hạnh phúc, luôn rạng rỡ và đạt được mọi ước mơ của mình. Hy vọng món quà nhỏ này sẽ làm bạn mỉm cười!";

    const photoSources = ['3.jpeg', '3.jpeg', '3.jpeg'];

    const playMusic = () => {
        bgMusic.play().then(() => {
            musicStarted = true;
            removeListeners();
        }).catch(e => console.log("Autoplay waiting for interaction..."));
    };

    let musicStarted = false;
    const removeListeners = () => {
        const events = ['click', 'touchstart', 'mousemove', 'scroll', 'keydown'];
        events.forEach(event => document.removeEventListener(event, playMusic));
    };

    const events = ['click', 'touchstart', 'mousemove', 'scroll', 'keydown'];
    events.forEach(event => document.addEventListener(event, playMusic, { once: true }));

    playMusic();

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = Math.random() * 12 + 8;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;

        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = Math.random() * 8 + 7 + 's, ' + (Math.random() * 3 + 2) + 's';
        petal.style.opacity = Math.random() * 0.5 + 0.4;

        const rotation = Math.random() * 360;
        petal.style.transform = `rotate(${rotation}deg)`;

        petalsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 15000);
    }

    setInterval(createPetal, 400);

    function createStar() {
        if (revealSection.classList.contains('active')) return;

        const star = document.createElement('div');
        star.className = 'star';
        star.style.position = 'absolute';
        star.style.width = '3px';
        star.style.height = '3px';
        star.style.background = '#fff';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.boxShadow = '0 0 8px #fff, 0 0 15px rgba(255,255,255,0.5)';
        star.style.animation = 'twinkle 3s infinite alternate';
        star.style.zIndex = '1';

        petalsContainer.appendChild(star);
        setTimeout(() => star.remove(), 5000);
    }

    setInterval(createStar, 700);

    document.addEventListener('mousemove', (e) => {
        if (revealSection.classList.contains('active')) return;
        if (Math.random() > 0.15) return;

        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        trail.style.background = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`;
        document.body.appendChild(trail);

        setTimeout(() => trail.remove(), 1000);
    });

    function typeMessage(text, element, speed = 60) {
        element.innerHTML = '';
        surpriseBtn.style.display = 'none';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed + Math.random() * 30);
            } else {
                surpriseBtn.style.display = 'inline-block';
                surpriseBtn.style.animation = 'fadeIn 0.8s forwards';
            }
        }
        type();
    }

    giftBox.addEventListener('click', () => {
        box.classList.add('open');
        revealImage.src = photoSources[Math.floor(Math.random() * photoSources.length)];

        setTimeout(() => {
            revealSection.classList.add('active');
            setTimeout(() => typeMessage(message, typingText), 600);
        }, 1200);
    });

    closeBtn.addEventListener('click', () => {
        revealSection.classList.remove('active');
        box.classList.remove('open');
        typingText.innerHTML = '';
        surpriseBtn.style.display = 'none';
    });

    surpriseBtn.addEventListener('click', () => {
        // Show the surprise overlay
        surpriseOverlay.style.display = 'flex';

        // Rain of stars
        for (let i = 0; i < 100; i++) {
            setTimeout(createStar, i * 30);
        }
    });

    closeSurprise.addEventListener('click', () => {
        surpriseOverlay.style.display = 'none';
    });

    // Close on overlay click
    surpriseOverlay.addEventListener('click', (e) => {
        if (e.target === surpriseOverlay) {
            surpriseOverlay.style.display = 'none';
        }
    });
});
