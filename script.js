const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const message = document.getElementById('message');
const sadCat = document.getElementById('sad-cat');
const madCat = document.getElementById('mad-cat');
const tear = document.querySelector('.tear');
const buttonsWrapper = document.getElementById('buttons-wrapper');

let isAbsolute = false;

// Trigger dodge on hover or touch
noBtn.addEventListener('mouseover', dodgeButton);
noBtn.addEventListener('touchstart', dodgeButton);

function dodgeButton() {
    if (!isAbsolute) {
        // Lock the wrapper's dimensions so the 'Yes' button stays perfectly in place
        buttonsWrapper.style.width = buttonsWrapper.offsetWidth + 'px';
        buttonsWrapper.style.height = buttonsWrapper.offsetHeight + 'px';
        
        // Grab current physical position before taking it out of the flex flow
        const rect = noBtn.getBoundingClientRect();
        noBtn.style.position = 'fixed';
        noBtn.style.left = rect.left + 'px';
        noBtn.style.top = rect.top + 'px';
        isAbsolute = true;
        
        // Tiny delay so the transition doesn't jump on the first move
        setTimeout(calculateNewPosition, 50);
    } else {
        calculateNewPosition();
    }
}

function calculateNewPosition() {
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;
    
    // Strict boundaries so it never escapes the window
    const maxX = window.innerWidth - buttonWidth - 20; 
    const maxY = window.innerHeight - buttonHeight - 20;
    
    // Minimum 20px padding from the top/left edges
    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

yesBtn.addEventListener('click', () => {
    // Update Text and hide the tear
    message.innerText = "Yay! Thank you! 💕";
    tear.style.display = 'none';
    
    // Switch to happy cat emojis
    sadCat.innerHTML = '😻';
    madCat.innerHTML = '😽';
    
    // Hide the buttons entirely
    buttonsWrapper.style.display = 'none';
    
    // Add the jumping celebration animation
    sadCat.classList.add('jump');
    madCat.classList.add('jump');
    
    // Delay the second cat's jump slightly so they bounce opposite each other
    madCat.style.animationDelay = "0.2s";
});