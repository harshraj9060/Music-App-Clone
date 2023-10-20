//console.log('Welcome to Spotify');
//INITIALIZE Variables
let songIndex = 0; 
let audioElement = new Audio('images/dj/1.mp3'); //link 1.mp3 to js
let masterPlay = document.getElementById('masterPlay'); //playbutton
let myProgressBar = document.getElementById('myProgressBar'); //seekbar id
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


//array of objects-songsname , filepath,  iamgeofthatsong-coverpath
let songs = [
    {songName: "Salamat", fiePath: "songs/images/dj/1.mp3", coverPath: "images/covers/10.jpg"},
    {songName: "Salamat e ishw", fiePath: "songs/images/dj/2.mp3", coverPath: "images/covers/9.jpg"},
    {songName: "Salamat tfutf", fiePath: "songs/images/dj/3.mp3", coverPath: "images/covers/8.jpg"},
    {songName: "bhula densa", fiePath: "songs/images/dj/4.mp3", coverPath: "images/covers/7.jpg"},
    {songName: "rahar", fiePath: "songs/images/dj/5.mp3", coverPath: "images/covers/6.jpg"},
    {songName: "Shgfu", fiePath: "songs/images/dj/6.mp3", coverPath: "images/covers/5.jpg"},
    {songName: "yffuk", fiePath: "songs/images/dj/7.mp3", coverPath: "images/covers/4.jpg"},
    {songName: "cjt", fiePath: "songs/images/dj/8.mp3", coverPath: "images/covers/3.jpg"}, 
    {songName: "rydrdi", fiePath: "songs/images/dj/9.mp3", coverPath: "images/covers/2.jpg"},
    {songName: "na jana", fiePath: "songs/images/dj/10.mp3", coverPath: "images/covers/1.jpg"},
]

songItems.forEach((element, i)=>{
// console.log(element, i);
 element.getElementsByTagName("img")[0].src = songs[i].coverPath;
 element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})
//Handle play/pause Click:
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play(); //play the audio
        masterPlay.classList.remove('fa-circle-play'); // remove play icon
        masterPlay.classList.add('fa-pause'); // show pause icon
        gif.style.opacity=1; //visible 
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause'); 
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;

    }
})

//LISTEN TO EVENTS-time change of audio
audioElement.addEventListener('timeupdate', ()=>{
   // console.log('timeupdate');
    //update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);//how much % it played
  //  console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{ //change event
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100; // %*duration/100 =  seek audio at that progress bar current value
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-circle-play'); // in side of every song on click play button shows.
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{   // array.from used to create a new array instance from a given array.
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id); // get index of songs from that id in int form
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `images/dj/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9)
    {
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `images/dj/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause');

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `images/dj/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause');

})