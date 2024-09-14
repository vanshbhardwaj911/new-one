console.log("This is Rhythmic Music Player");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = document.getElementsByClassName('songItemContainer')[0];
let nowPlayingCover = document.getElementById('nowPlayingCover');
let nowPlayingTitle = document.getElementById('nowPlayingTitle');
let volumeControl = document.getElementById('volumeControl');
let isShuffling = false;
let isRepeating = false;

let songs = [
    {songName: "Song 1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Song 2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Song 3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Song 4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Song 5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Song 6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Song 7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Song 8", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Song 9", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Song 10", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

songs.forEach((song, i) => {
    songItems.innerHTML += `
        <div class="songItem">
            <img src="${song.coverPath}" alt="${i + 1}">
            <span class="songName">${song.songName}</span>
            <span class="songlistplay"><span class="timestamp">--:-- <i id="${i}" class="far songItemPlay fa-play-circle"></i></span></span>
        </div>`;
});

Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    element.addEventListener('click', () => {
        makeAllPlays();
        songIndex = i; 
        element.querySelector('.songItemPlay').classList.remove('fa-play-circle');
        element.querySelector('.songItemPlay').classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        nowPlayingCover.src = songs[songIndex].coverPath;  
        nowPlayingTitle.innerText = songs[songIndex].songName; 
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.body.classList.add('playing');
        displayLyrics(songIndex);
    });
});

volumeControl.addEventListener('input', () => {
    audioElement.volume = volumeControl.value / 100;
});

document.getElementById('shuffle').addEventListener('click', () => {
    isShuffling = !isShuffling;
    document.getElementById('shuffle').style.color = isShuffling ? '#f00' : '#fff';
});

document.getElementById('repeat').addEventListener('click', () => {
    isRepeating = !isRepeating;
    document.getElementById('repeat').style.color = isRepeating ? '#f00' : '#fff';
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        document.body.classList.add('playing');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        document.body.classList.remove('playing');
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    document.getElementById('currentTime').innerText = formatTime(audioElement.currentTime);
    document.getElementById('duration').innerText = formatTime(audioElement.duration);
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

document.getElementById('next').addEventListener('click', () => {
    if (isShuffling) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else if (isRepeating) {
    } else {
        songIndex = (songIndex >= 9) ? 0 : songIndex + 1;
    }
    playSong();
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    playSong();
});

const playSong = () => {
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    nowPlayingCover.src = songs[songIndex].coverPath;  
    nowPlayingTitle.innerText = songs[songIndex].songName; 
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.body.classList.add('playing');
    displayLyrics(songIndex);
};

let isDarkMode = true;
document.getElementById('darkModeToggle').addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.style.backgroundColor = isDarkMode ? '#000' : '#fff';
    document.body.style.color = isDarkMode ? '#fff' : '#000';
    document.getElementById('darkModeToggle').classList.toggle('fa-sun');
});

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

let lyrics = {
    0: "Lyrics for song 1...",
    1: "Lyrics for song 2...",
};

const displayLyrics = (index) => {
    document.getElementById('lyricsContainer').innerText = lyrics[index] || "Lyrics not available";
};

document.querySelectorAll('.songItem img').forEach(img => {
    img.style.width = '40px';
    img.style.height = '40px';
    img.style.borderRadius = '50%';
});
