/* 1.Render songs
2. Scroll top
3. Play / pause / seek
4. CD rotate
5. Next/ prev
6. Random
7. Next/ Repeat when ended
8. Active song
9. Scroll active song intro-view
10. Play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const player = $(".player");
const playList = $(".playlist");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const PLAYER_STORAGE_KEY = "F8-PLAYER";
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Angel baby",
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
      singer: "Imagine Dragons",
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
      singer: "Alan Walker & Sorana",
      path: "./assets/audio/song6.mp3",
      image: "./assets/img/song6.jpg",
    },
    {
      name: "Until you",
      singer: "Shayne Ward",
      path: "./assets/audio/song7.mp3",
      image: "./assets/img/song7.jpg",
    },
    {
      name: "Until you",
      singer: "Shayne Ward",
      path: "./assets/audio/song7.mp3",
      image: "./assets/img/song7.jpg",
    },
    {
      name: "Until you",
      singer: "Shayne Ward",
      path: "./assets/audio/song7.mp3",
      image: "./assets/img/song7.jpg",
    },
    {
      name: "Until you",
      singer: "Shayne Ward",
      path: "./assets/audio/song7.mp3",
      image: "./assets/img/song7.jpg",
    },
    {
      name: "Until you",
      singer: "Shayne Ward",
      path: "./assets/audio/song7.mp3",
      image: "./assets/img/song7.jpg",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `<div class="song ${
        index == this.currentIndex ? "active" : ""
      }" data-index=${index}>
        <div
          class="thumb"
          style="background-image: url('${song.image}');"
        ></div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
        </div>`;
    });
    playList.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    // Xử lý CD quay và dừng
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, //10 seconds
      iterations: Infinity,
    });
    cdThumbAnimate.pause();
    // Xử lý phóng to thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    // Xử lý khi click Play
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
    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    // Xử lý khi tua song
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    // Khi next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    // Xử lý bật tắt random song
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    // Xử lý khi lặp lại một song
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
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
    // Lắng nghe hành vi click vào play list
    playList.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || !e.target.closest(".option")) {
        // Xử lý khi click vào song
        if (e.target.closest(".song:not(.active)")) {
          if (songNode) {
            _this.currentIndex = Number(songNode.dataset.index);
            _this.loadCurrentSong();
            _this.render();
            audio.play();
          }
        }
      }
    };
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex == this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  scrollToActiveSong() {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
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
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    this.loadConfig();
    // Địng nghĩa các thuộc tính chp object
    this.defineProperties();
    // Lắng nghe và xử lý các sự kiện (DOM event)
    this.handleEvents();
    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();
    // Render lại playlist
    this.render();
    // hiển thị trạng thái ban đầu của button repeat và random
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};

app.start();
