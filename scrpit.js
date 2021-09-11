$(function () {
    var albumArt = $("#album-art"),
      playPauseButton = $("#play-pause-button"),
      i = playPauseButton.find("i"),
      playProgress,
      bTime,
      nTime = 0,
      buffInterval = null,
      albumArtworks = ["_1", "_2", "_3", "_4", "_5","_6","_7","_8","_9","_10","_11","_12","_13","_14","_15","_16","_17","_18","_19","_20",
      "_21", "_22", "_23", "_24", "_25","_26","_27","_28","_29","_30","_31","_32","_33","_34","_35","_36","_37","_38","_39","_40",
      "_41", "_42", "_43", "_44", "_45","_46","_47","_48","_49","_50","_51","_52","_53","_54","_55","_56","_57","_58","_59","_60","_61", "_62", "_63", "_64", "_65"  
    ],
      
      trackUrl = [
       /* "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3",
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3",
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3",
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3",
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3",
        "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3"*/
        "./mp/1.mp3", "./mp/2.mp3", "./mp/3.mp3", "./mp/4.mp3", "./mp/5.mp3", "./mp/6.mp3", "./mp/7.mp3", "./mp/8.mp3", "./mp/9.mp3", "./mp/10.mp3",
        "./mp/11.mp3", "./mp/12.mp3", "./mp/13.mp3", "./mp/14.mp3", "./mp/15.mp3", "./mp/16.mp3", "./mp/17.mp3", "./mp/18.mp3", "./mp/19.mp3", "./mp/20.mp3",
        "./mp/21.mp3", "./mp/22.mp3", "./mp/23.mp3", "./mp/24.mp3", "./mp/25.mp3", "./mp/26.mp3", "./mp/27.mp3", "./mp/28.mp3", "./mp/29.mp3", "./mp/30.mp3",
        "./mp/31.mp3", "./mp/32.mp3", "./mp/33.mp3", "./mp/34.mp3", "./mp/35.mp3", "./mp/36.mp3", "./mp/37.mp3", "./mp/38.mp3", "./mp/39.mp3", "./mp/40.mp3",
        "./mp/41.mp3", "./mp/42.mp3", "./mp/43.mp3", "./mp/44.mp3", "./mp/45.mp3", "./mp/46.mp3", "./mp/47.mp3", "./mp/48.mp3", "./mp/49.mp3", "./mp/50.mp3",
        "./mp/51.mp3", "./mp/52.mp3", "./mp/53.mp3", "./mp/54.mp3", "./mp/55.mp3", "./mp/56.mp3", "./mp/57.mp3", "./mp/58.mp3", "./mp/59.mp3", "./mp/60.mp3",
        "./mp/61.mp3", "./mp/62.mp3", "./mp/63.mp3", "./mp/64.mp3", "./mp/65.mp3"
      ],
      playPreviousTrackButton = $("#play-previous"),
      playNextTrackButton = $("#play-next"),
      currIndex = -1;
  
    function playPause() {
      setTimeout(function () {
        if (audio.paused) {
          albumArt.addClass("active");
          checkBuffering();
          i.attr("class", "fas fa-pause");
          audio.play();
        } else {
          albumArt.removeClass("active");
          clearInterval(buffInterval);
          albumArt.removeClass("buffering");
          i.attr("class", "fas fa-play");
          audio.pause();
        }
      }, 300);
    }
  
    function updateCurrTime() {
      nTime = new Date();
      nTime = nTime.getTime();
  
      playProgress = (audio.currentTime / audio.duration) * 100;
  
      if (playProgress == 100) {
        i.attr("class", "fa fa-play");
        albumArt.removeClass("buffering").removeClass("active");
        clearInterval(buffInterval);
        selectTrack(1);
      }
    }
  
    function checkBuffering() {
      clearInterval(buffInterval);
      buffInterval = setInterval(function () {
        if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
        else albumArt.removeClass("buffering");
  
        bTime = new Date();
        bTime = bTime.getTime();
      }, 100);
    }
  
    function replay() {
      audio.currentTime = 0;
    }
  
    function selectTrack(flag) {
      if (flag == 0 || flag == 1) ++currIndex;
      else --currIndex;
  
      if (!(currIndex > -1 && currIndex < albumArtworks.length)) {
        if (flag == 0 || flag == 1) currIndex = 0;
        else currIndex = albumArtworks.length - 1;
      }
      if (flag == 0) i.attr("class", "fa fa-play");
      else {
        albumArt.removeClass("buffering");
        i.attr("class", "fa fa-pause");
      }
  
      currArtwork = albumArtworks[currIndex];
  
      audio.src = trackUrl[currIndex];
  
      nTime = 0;
      bTime = new Date();
      bTime = bTime.getTime();
  
      if (flag != 0) {
        audio.play();
        albumArt.addClass("active");
  
        clearInterval(buffInterval);
        checkBuffering();
      }
      albumArt.find("img.active").removeClass("active");
      $("#" + currArtwork).addClass("active");
    }
  
    function initPlayer() {
      audio = new Audio();
  
      selectTrack(0);
  
      audio.loop = false;
  
      playPauseButton.on("click", playPause);
  
      //albumArt.on("click", replay);
  
      $(audio).on("timeupdate", updateCurrTime);
  
      playPreviousTrackButton.on("click", function () {
        selectTrack(-1);
      });
      playNextTrackButton.on("click", function () {
        selectTrack(1);
      });
    }
  
    initPlayer();
  });