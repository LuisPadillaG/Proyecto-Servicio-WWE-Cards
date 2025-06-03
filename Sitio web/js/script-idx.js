const video = document.getElementById('background-video');
const muteBtn = document.getElementById('mute-btn');
const muteIcon = document.getElementById('mute-icon');

muteBtn.addEventListener('click', () => {
    if (video.muted) {
        video.muted = false;
        muteIcon.src = '../recursos/icons/volume_on.png';
    } else {
        video.muted = true;
        muteIcon.src = '../recursos/icons/volume_off.png';
    }
});

