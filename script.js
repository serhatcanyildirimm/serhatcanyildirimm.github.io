// Achtergrond hartjes genereren (minder hartjes)
function createHearts() {
    const heartsContainer = document.getElementById('hearts-background');
    const hearts = ['❤️', '💕', '💖'];
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heartsContainer.appendChild(heart);
    }
}

// Confetti explosie functie (minder op mobiel voor betere performance)
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff9ff3', '#54a0ff'];
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓', '💞'];
    
    // Verwijder oude confetti
    confettiContainer.innerHTML = '';
    
    // Minder confetti op mobiel voor betere performance
    const isMobile = window.innerWidth <= 600;
    const confettiCount = isMobile ? 80 : 150;
    const heartCount = isMobile ? 30 : 50;
    
    // Creëer confetti stukjes
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        confettiContainer.appendChild(confetti);
    }
    
    // Creëer hartjes confetti
    for (let i = 0; i < heartCount; i++) {
        const heartConfetti = document.createElement('div');
        heartConfetti.className = 'confetti-heart';
        heartConfetti.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heartConfetti.style.left = Math.random() * 100 + '%';
        heartConfetti.style.animationDuration = (Math.random() * 3 + 2.5) + 's';
        heartConfetti.style.animationDelay = Math.random() * 0.5 + 's';
        confettiContainer.appendChild(heartConfetti);
    }
    
    // Verwijder confetti na animatie
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
}

// Nee knop verplaatsen functie
function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    const container = document.getElementById('buttonsContainer');
    const containerRect = container.getBoundingClientRect();
    
    // Genereer willekeurige positie binnen de container
    const maxX = Math.max(0, containerRect.width - noBtn.offsetWidth);
    const maxY = Math.max(0, containerRect.height - noBtn.offsetHeight);
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Gebruik transform voor soepele beweging
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transform = 'scale(0.9)';
    
    // Reset transform na korte tijd voor hover effect
    setTimeout(() => {
        noBtn.style.transform = 'scale(1)';
    }, 100);
}

// Detecteer of het een touch device is
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Variabele om bij te houden of foto's moeten verschijnen
let photosEnabled = false;
let lastPhotoTime = 0;
const photoCooldown = 200; // Minimum tijd tussen foto's (ms)
let currentPhotoIndex = 1; // Start bij foto 1

// Vuurwerk variabelen
let fireworksInterval = null;
const fireworkColors = ['#ff0000', '#ff3333', '#ff5555', '#ff6b6b', '#ff1a1a', '#cc0000', '#ff4444', '#ff2222', '#ff6666', '#ff1111'];

// Functie om hartvormige coördinaten te berekenen
function getHeartPoint(t, scale) {
    // Parametrische hartvergelijking
    const x = 16 * Math.pow(Math.sin(t), 3) * scale;
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * scale;
    return { x, y };
}

// Functie om een vuurwerk explosie te creëren in hartvorm
function createFirework(x, y) {
    // Eerst: creëer raket die omhoog gaat vanaf de grond
    const startY = window.innerHeight - 20; // Start vanaf onderkant scherm
    const targetY = y; // Doelpositie waar het explodeert
    const distance = startY - targetY; // Afstand die de raket moet afleggen
    
    const rocket = document.createElement('div');
    rocket.className = 'firework-rocket';
    rocket.style.left = (x - 4) + 'px'; // Center de raket
    rocket.style.top = startY + 'px';
    rocket.style.setProperty('--target-y', `-${distance}px`);
    document.body.appendChild(rocket);

    // Na 1 seconde (wanneer raket boven is), explodeer in hartvorm
    setTimeout(() => {
        // Verwijder raket
        if (rocket.parentNode) {
            rocket.parentNode.removeChild(rocket);
        }

        // Creëer explosie container
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        document.body.appendChild(firework);

        // Meer deeltjes voor een duidelijk hartje
        const isMobile = window.innerWidth <= 600;
        const particleCount = isMobile ? 60 : 100; // Meer deeltjes voor hartvorm
        const sparkCount = isMobile ? 25 : 40;
        const heartScale = isMobile ? 4 : 6; // Veel groter hart

        // Creëer hoofddeeltjes in hartvorm
        for (let i = 0; i < particleCount; i++) {
            const t = (Math.PI * 2 * i) / particleCount;
            const heartPoint = getHeartPoint(t, heartScale);
            
            // Voeg wat variatie toe voor natuurlijker effect
            const variation = 0.8 + Math.random() * 0.4;
            const tx = heartPoint.x * variation;
            const ty = heartPoint.y * variation;
            
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.background = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.left = '50%';
            particle.style.top = '50%';
            firework.appendChild(particle);
        }

        // Creëer kleine vonken rondom het hart (extra effect)
        for (let i = 0; i < sparkCount; i++) {
            const t = Math.random() * Math.PI * 2;
            const heartPoint = getHeartPoint(t, heartScale * 1.2);
            
            // Voeg extra variatie toe voor vonken
            const variation = 0.6 + Math.random() * 0.6;
            const tx = heartPoint.x * variation;
            const ty = heartPoint.y * variation;
            
            const spark = document.createElement('div');
            spark.className = 'firework-spark';
            spark.style.background = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
            spark.style.setProperty('--tx', tx + 'px');
            spark.style.setProperty('--ty', ty + 'px');
            spark.style.left = '50%';
            spark.style.top = '50%';
            firework.appendChild(spark);
        }

        // Verwijder vuurwerk na animatie (langer omdat animatie nu 3s duurt)
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 3500);
    }, 1000); // Wacht 1 seconde voor explosie
}

// Functie om periodiek vuurwerk te laten exploderen
function startFireworks() {
    // Stop eventuele bestaande interval
    if (fireworksInterval) {
        clearInterval(fireworksInterval);
    }

    // Eerste vuurwerk direct
    setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6) + (window.innerHeight * 0.2);
        createFirework(x, y);
    }, 500);

    // Blijf vuurwerk laten exploderen elke 1-2 seconden
    const isMobile = window.innerWidth <= 600;
    const intervalTime = isMobile ? 1800 + Math.random() * 1000 : 1200 + Math.random() * 800;
    
    fireworksInterval = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6) + (window.innerHeight * 0.2);
        createFirework(x, y);
    }, intervalTime);
}

// Functie om vuurwerk te stoppen
function stopFireworks() {
    if (fireworksInterval) {
        clearInterval(fireworksInterval);
        fireworksInterval = null;
    }
}

// Functie om een foto te laten verschijnen bij muispositie
function showPhotoAtPosition(x, y) {
    // Cooldown om niet te veel foto's tegelijk te tonen
    const now = Date.now();
    if (now - lastPhotoTime < photoCooldown) {
        return;
    }
    lastPhotoTime = now;

    // Gebruik de huidige foto index (1, 2, 3, 4, dan weer 1, etc.)
    const photoNumber = currentPhotoIndex;
    const photoPath = `assets/photo${photoNumber}.jpg`;
    
    // Verhoog index voor volgende foto (1->2->3->4->5->1->2->...)
    currentPhotoIndex = (currentPhotoIndex % 5) + 1;

    // Maak een nieuwe foto element
    const photo = document.createElement('img');
    photo.className = 'floating-photo';
    photo.src = photoPath;
    photo.alt = 'Liefdesfoto';
    
    // Zet positie op muis/touch locatie
    photo.style.left = x + 'px';
    photo.style.top = y + 'px';
    
    // Voeg toe aan body
    document.body.appendChild(photo);
    
    // Verwijder na animatie
    setTimeout(() => {
        if (photo.parentNode) {
            photo.parentNode.removeChild(photo);
        }
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    createHearts();
    
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebration = document.getElementById('celebration');
    const mainContainer = document.getElementById('mainContainer');

    // Photo5 preview bij hover op Ja-knop
    let jaPhotoPreview = null;
    yesBtn.addEventListener('mouseenter', function(e) {
        // Toon photo5 preview
        if (jaPhotoPreview) return;
        jaPhotoPreview = document.createElement('img');
        jaPhotoPreview.className = 'ja-btn-preview';
        jaPhotoPreview.src = 'assets/photo3.jpg';
        jaPhotoPreview.alt = '';
        document.body.appendChild(jaPhotoPreview);
        const rect = yesBtn.getBoundingClientRect();
        jaPhotoPreview.style.left = (rect.left + rect.width / 2) + 'px';
        jaPhotoPreview.style.top = (rect.top - 20) + 'px';
    });
    yesBtn.addEventListener('mouseleave', function() {
        // Verwijder photo5 preview
        if (jaPhotoPreview && jaPhotoPreview.parentNode) {
            jaPhotoPreview.parentNode.removeChild(jaPhotoPreview);
            jaPhotoPreview = null;
        }
    });

    // Ja knop klik
    yesBtn.addEventListener('click', function() {
        // Verberg titel, vraag en knoppen
        document.querySelector('h1').style.display = 'none';
        document.querySelector('.question').style.display = 'none';
        document.getElementById('buttonsContainer').style.display = 'none';

        // Confetti explosie!
        createConfetti();
        
        // Achtergrondafbeelding toevoegen
        document.body.classList.add('celebrating-background');
        
        // Viering tonen
        celebration.classList.add('show');
        
        // Container animatie
        mainContainer.classList.add('celebrating');
        
        // Activeer foto's bij muisbeweging
        photosEnabled = true;
        
        // Start vuurwerk dat blijft exploderen
        startFireworks();
        
        // Speel een geluidje (optioneel - browser kan dit blokkeren)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 523.25; // C5
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch(e) {
            // Geluid niet beschikbaar, geen probleem
        }
    });

    // Muisbeweging event listener (alleen na "Ja" klik)
    let mouseMoveThrottle = false;
    document.addEventListener('mousemove', function(e) {
        if (!photosEnabled || mouseMoveThrottle) return;
        
        mouseMoveThrottle = true;
        showPhotoAtPosition(e.clientX, e.clientY);
        
        // Throttle: wacht even voordat volgende foto kan verschijnen
        setTimeout(() => {
            mouseMoveThrottle = false;
        }, 100);
    });

    // Touch beweging voor mobiel (alleen na "Ja" klik)
    let touchMoveThrottle = false;
    document.addEventListener('touchmove', function(e) {
        if (!photosEnabled || touchMoveThrottle) return;
        
        touchMoveThrottle = true;
        const touch = e.touches[0];
        if (touch) {
            showPhotoAtPosition(touch.clientX, touch.clientY);
        }
        
        // Throttle: wacht even voordat volgende foto kan verschijnen
        setTimeout(() => {
            touchMoveThrottle = false;
        }, 150);
    }, { passive: true });
    
    // Nee knop hover - verplaats de knop (alleen desktop)
    if (!isTouchDevice()) {
        noBtn.addEventListener('mouseenter', function() {
            moveNoButton();
        });
        
        // Extra: verplaats ook als de muis dichtbij komt
        noBtn.addEventListener('mousemove', function(e) {
            const rect = noBtn.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(e.clientX - (rect.left + rect.width/2), 2) +
                Math.pow(e.clientY - (rect.top + rect.height/2), 2)
            );
            
            // Als de muis binnen 50px komt, verplaats de knop
            if (distance < 50) {
                moveNoButton();
            }
        });
    }
    
    // Nee knop klik/touch - verplaats ook bij klikken
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        moveNoButton();
    });

    // Touch events voor mobiel
    let touchStartTime = 0;
    noBtn.addEventListener('touchstart', function(e) {
        touchStartTime = Date.now();
        // Verplaats direct bij touch
        moveNoButton();
    }, { passive: true });

    noBtn.addEventListener('touchmove', function(e) {
        // Verplaats als gebruiker probeert te bewegen naar de knop
        const touch = e.touches[0];
        const rect = noBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
            Math.pow(touch.clientX - centerX, 2) +
            Math.pow(touch.clientY - centerY, 2)
        );
        
        // Als touch binnen 80px komt, verplaats de knop
        if (distance < 80) {
            moveNoButton();
        }
    }, { passive: true });

    noBtn.addEventListener('touchend', function(e) {
        // Voorkom klik als het een snelle touch was (minder dan 200ms)
        if (Date.now() - touchStartTime < 200) {
            e.preventDefault();
            moveNoButton();
        }
    });
});
