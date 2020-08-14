
const myVideo = document.createElement('video');
myVideo.muted = true;

const videoGrid= document.querySelector('#video-grid');

let myVideoStream

const addVideoStream = (video , stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata' , () => {
        video.play();
    })
    videoGrid.append(video);
}

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})



