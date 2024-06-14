console.log("Welcome to My Music Player");

let songIndex = 1;
let mainPlaybtn = document.getElementById("playBtn");
let gif = document.getElementById("gif");
let audioElement = new Audio("./Songs2/1.mp3");
let myProgressBar = document.getElementById("progressbar");
let songDiv = Array.from(document.getElementsByClassName("song"));
let allPlayBtn = document.querySelectorAll(".playBtn");

let songs = [
  {
    songName: "Lost Sky - Fearless",
    filePath: "Songs2/1.mp3",
    coverPath: "coverImages/ncs.jpg",
  },

  {
    songName: "Cartoon - On & On (feat. Daniel Levi)",
    filePath: "Songs2/2.mp3",
    coverPath: "coverImages/ncs.jpg",
  },
  {
    songName: "Janji - Heroes Tonight (feat. Johnning)",
    filePath: "Songs2/3.mp3",
    coverPath: "coverImages/ncs.jpg",
  },
  {
    songName: "Josh Rubin - Black and White",
    filePath: "Songs2/4.mp3",
    coverPath: "coverImages/ncs.jpg",
  },
  {
    songName: "Raven & Kreyn, KDH - Dum Dum",
    filePath: "Songs2/5.mp3",
    coverPath: "coverImages/ncs.jpg",
  },
  {
    songName: "Alan Walker - Dreamer",
    filePath: "Songs2/6.mp3",
    coverPath: "coverImages/ncs.jpg",
  },
  {
    songName: "Cartoon - Why We Lose (feat. Coleman)",
    filePath: "Songs2/7.mp3",
    coverPath: "coverImages/ncs.jpg",
  },
  {
    songName: "Jim Yosef - Volcano (feat. Scarlett)",
    filePath: "Songs2/8.mp3",
    coverPath: "coverImages/ncs.jpg",
  },
  {
    songName: "T & Sugah - TumDaDaDum",
    filePath: "Songs2/9.mp3",
    coverPath: "coverImages/ncs.jpg",
  },
  {
    songName: "Warriyo - Mortals (feat. Laura Brehm)",
    filePath: "Songs2/10.mp3",
    coverPath: "coverImages/ncs.jpg",
  },
];

songDiv.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songTitle")[0].innerHTML = songs[i].songName;
});

// listening to events
let flag = 0;
mainPlaybtn.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    if (flag < 1) {
      document.getElementsByClassName(
        "songName"
      )[0].innerHTML = "Alan Walker - Faded";
      allPlayBtn[0].classList.remove("fa-circle-play");
      allPlayBtn[0].classList.add("fa-circle-pause");
      songDiv[0].getElementsByClassName("gif")[0].classList.remove("hidden");
      flag++;
    }
    // allPlayBtn[0].classList.add("song-playing");
    mainPlaybtn.classList.remove("fa-circle-play");
    mainPlaybtn.classList.add("fa-circle-pause");
    songDiv.forEach((e) => {
      if (e.querySelectorAll(".playBtn")[0].classList.contains("song-playing")) {
        e.querySelectorAll(".playBtn")[0].classList.remove("fa-circle-play");
        e.querySelectorAll(".playBtn")[0].classList.add("fa-circle-pause");
        e.getElementsByClassName("gif")[0].classList.remove("hidden");

      }
    })

  } else if (audioElement.play || audioElement.currentTime >= 0) {
    audioElement.pause();
    if (flag <= 1) {
      allPlayBtn[0].classList.remove("fa-circle-pause");
      allPlayBtn[0].classList.add("fa-circle-play");
      songDiv[0].getElementsByClassName("gif")[0].classList.add("hidden");

    }
    mainPlaybtn.classList.remove("fa-circle-pause");
    mainPlaybtn.classList.add("fa-circle-play");

    songDiv.forEach((e) => {
      if (e.querySelectorAll(".playBtn")[0].classList.contains("song-playing")) {
        e.querySelectorAll(".playBtn")[0].classList.remove("fa-circle-pause");
        e.querySelectorAll(".playBtn")[0].classList.add("fa-circle-play");
        e.getElementsByClassName("gif")[0].classList.add("hidden");

      }
    })
  }
});

let pauseOthers = () => {
  allPlayBtn.forEach((element) => {
    audioElement.pause();
    if (
      element.parentElement
        .getElementsByClassName("gif")[0]
        .classList.contains("gif")
    ) {
      element.parentElement
        .getElementsByClassName("gif")[0]
        .classList.add("hidden");
    }

    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
    if (element.classList.contains("song-playing")) {
      element.classList.remove("song-playing")
    }
  });
};

allPlayBtn.forEach((element, i) => {
  if (audioElement.paused) {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  }
  element.addEventListener("click", (e) => {
    document.getElementsByClassName(
      "songName"
    )[0].innerHTML = `${songs[i].songName}`;

    songIndex = e.target.id;


    if (element.classList.contains("fa-circle-play")) {
      pauseOthers();
      element.parentElement
        .getElementsByClassName("gif")[0]
        .classList.remove("hidden");
      element.parentElement
        .getElementsByClassName("playBtn")[0]
        .classList.add("song-playing");
      audioElement = new Audio(`${songs[songIndex - 1].filePath}`);
      audioElement.play();
      element.classList.remove("fa-circle-play");
      element.classList.add("fa-circle-pause");
      mainPlaybtn.classList.remove("fa-circle-play");
      mainPlaybtn.classList.add("fa-circle-pause");

    } else if (element.classList.contains("fa-circle-pause")) {
      audioElement.pause();
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
      mainPlaybtn.classList.remove("fa-circle-pause");
      mainPlaybtn.classList.add("fa-circle-play");
      element.parentElement
        .getElementsByClassName("gif")[0]
        .classList.add("hidden");
    }
    audioElement.addEventListener("timeupdate", () => {
      progress = parseInt(
        (audioElement.currentTime / audioElement.duration) * 100
      );
      myProgressBar.value = progress;
    });
  });
});





// handling forward btn
let forwardBtn = document.getElementById("forwardBtn");
forwardBtn.addEventListener('click', (e) => {
  // console.log(audioElement)
  console.log(songIndex)
  if (songIndex >= 10) {
    songIndex = 0;
  }
  else {
    songIndex++;
  }
  songIndex = parseInt(songIndex);
  // console.log(audioElement)
  audioElement.src = `songs2/${songIndex}.mp3`
  audioElement.play();

  allPlayBtn.forEach((e, i) => {
    if (allPlayBtn[i].classList.contains("fa-circle-pause")) {

      currentSong = allPlayBtn[i].parentElement;
      i++;
      nextSong = allPlayBtn[i].parentElement;
    }
  })
  // console.log(currentSong);
  // console.log(nextSong);
  currentSong.getElementsByClassName("playBtn")[0].classList.remove("song-playing")
  nextSong.getElementsByClassName("playBtn")[0].classList.add("song-playing")
  document.getElementsByClassName("songName")[0].innerHTML = nextSong.getElementsByClassName("songTitle")[0].innerHTML;
  currentSong.querySelector(".gif").classList.add("hidden");
  currentSong.querySelector(".playBtn").classList.remove("fa-circle-pause");
  currentSong.querySelector(".playBtn").classList.add("fa-circle-play");

  nextSong.querySelector(".gif").classList.remove("hidden");
  nextSong.querySelector(".playBtn").classList.remove("fa-circle-play");
  nextSong.querySelector(".playBtn").classList.add("fa-circle-pause");

})



// handling backward btn
let backwardBtn = document.getElementById("backwardBtn");
backwardBtn.addEventListener('click', (e) => {
  // console.log(audioElement)
  if (songIndex <= 0) {
    songIndex = 0
  }
  else {
    songIndex -= 1;
  }
  songIndex = parseInt(songIndex);
  // console.log(audioElement)
  audioElement.src = `songs2/${songIndex}.mp3`
  audioElement.play();
  allPlayBtn.forEach((e, i) => {
    if (allPlayBtn[i].classList.contains("fa-circle-pause")) {

      currentSong = allPlayBtn[i].parentElement;
      i--;
      prevSong = allPlayBtn[i].parentElement;
    }
  })
  // console.log(currentSong);
  // console.log(nextSong);
  currentSong.getElementsByClassName("playBtn")[0].classList.remove("song-playing")
  prevSong.getElementsByClassName("playBtn")[0].classList.add("song-playing")
  document.getElementsByClassName("songName")[0].innerHTML = prevSong.getElementsByClassName("songTitle")[0].innerHTML;
  currentSong.querySelector(".gif").classList.add("hidden");
  currentSong.querySelector(".playBtn").classList.remove("fa-circle-pause");
  currentSong.querySelector(".playBtn").classList.add("fa-circle-play");

  prevSong.querySelector(".gif").classList.remove("hidden");
  prevSong.querySelector(".playBtn").classList.remove("fa-circle-play");
  prevSong.querySelector(".playBtn").classList.add("fa-circle-pause");

})


// handling progressbar
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});
