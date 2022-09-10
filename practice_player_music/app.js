const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playList = $(".playlist");
const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("audio");
const playBtn = $(".btn-toggle-play");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const progress = $("#progress");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "Angel Baby",
      singer: "Troye Sivan",
      path: "./assets/audio/song1.mp3",
      image: "./assets/img/song1.jpg",
    },
    {
      name: "Unstoppable",
      singer: "Sia",
      path: "./assets/audio/song2.mp3",
      image: "./assets/img/song2.jpg",
    },
    {
      name: "Safari",
      singer: "Serena",
      path: "./assets/audio/song3.mp3",
      image: "./assets/img/song3.jpg",
    },
    {
      name: "Demons",
      singer: "Imagine Dragon",
      path: "./assets/audio/song4.mp3",
      image: "./assets/img/song4.jpg",
    },
    {
      name: "Alone",
      singer: "Alan Walker & Noonie",
      path: "./assets/audio/song5.mp3",
      image: "./assets/img/song5.jpg",
    },
    {
      name: "Lost control",
      singer: "Alan Wakler & Sorana",
      path: "./assets/audio/song6.mp3",
      image: "./assets/img/song6.jpg",
    },
    {
      name: "Until you",
      singer: "Shayne Ward",
      path: "./assets/audio/song7.mp3",
      image: "./assets/img/song7.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map(function (song, index) {
      return `
            <div class="song ${
              index == this.currentIndex ? "active" : ""
            }">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `;
    });
    const html = htmls.join("");
    playList.innerHTML = html;
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  //   Xử lý phóng to thu nhỏ CD
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    // Xử lý CD quay, dừng
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // quay trong 10seconds
      interations: Infinity,
    });
    cdThumbAnimate.pause();
    // Xử lý phóng to, thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    // Xử lý khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // Khi song được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };
    // Khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
    // Khi click nút next
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
    };
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
    };
    // Xử lý bật/ tắt random song
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    // Xử lý lặp lại một bài hát
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };
    // Xử lý next song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    // Xử lý khi tua songs
    progress.onchange = function (e) {
      const seekTime = (e.target.value * audio.duration) / 100;
      audio.currentTime = seekTime;
    };
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex <= 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex == this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Định nghĩa các thuộc tính cho object
    this.defineProperties();
    // Lắng nghe/ xử lý các sự kiện (DOM events)
    this.handleEvents();
    // Tải thông tin bài hát vào UI khi chạy ứng dụng
    this.loadCurrentSong();
    // Render lại playlist
    this.render();
  },
};
app.start();
