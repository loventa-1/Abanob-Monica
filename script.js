// script.js
"use strict";

/* ===================== CONFIGURATION (EDIT YOUR DETAILS HERE) ===================== */
const CONFIG = {
  // Names
  groomName: "Abanob",
  brideName: "Monica",
  groomNameAr: "أبانوب",
  brideNameAr: "مونيكا",
  groomFullNameForInvite: "Dr. Abanoob Essam",
  brideFullNameForInvite: "Miss Monica Samir",
  groomFullNameForInviteAr: "الدكتور أبانوب عصام",
  brideFullNameForInviteAr: " مونيكا سمير",

  // 🟢 WEDDING DATE & TIME (MODIFY THIS VARIABLE WHENEVER NEEDED)
  weddingDateISO: "2026-05-28T17:00:00", // Format: YYYY-MM-DDTHH:MM:SS (19:00 = 7pm)
  weddingDateDisplay: "May 28, 2026",
  weddingDateDisplayAr: "٢٨ مايو ٢٠٢٦",

  // Church Details
  churchName: "Church of the Virgin Mary and St. John, Bab El Louq",
  churchNameAr: "كنيسة السيدة العذراء مريم و مار يوحنا بباب اللوق",
  churchTime: "5:00 PM",
  churchMapLink: "https://maps.app.goo.gl/WtCvqJj5GsUco4ev7?g_st=iw",

  // Venue Details
  venueName: "Air Force House",
  venueNameAr: "دار القوات الجوية",
  venueTime: "7:00 PM",
  venueMapLink: "https://maps.app.goo.gl/L89vX4jAA3CDJ5tGA?g_st=iw",

  // Media assets (update paths if needed)
  crestImage:
    "assets/images/Gemini_Generated_Image_aai6peaai6peaai6-removebg-preview.webp",
  doorStaticBg: "assets/images/demo3.webp",
  doorGif: "assets/images/image1.mp4",
  detailsBg: "assets/images/image2.jpg",
  musicUrl: "assets/music/music1.mp3",

  // WhatsApp numbers
  groomWhatsappNumber: "201070823287",
  brideWhatsappNumber: "201206607149",
};

// ========== GLOBALS ==========
let currentLang = "en";
let doorPlayed = false;
let currentWhatsAppMessage = "";
let bgMusic = null;
let countdownInterval = null;

// DOM Elements
const pageLoading = document.getElementById("page-loading");
const pageDoor = document.getElementById("page-door");
const pageDetails = document.getElementById("page-details");
const loadingBar = document.getElementById("loading-bar");
const doorGif = document.getElementById("door-gif");
const doorOverlay = document.getElementById("door-overlay");
const doorGlowRing = document.getElementById("door-glow-ring");
const knockBtn = document.getElementById("knock-btn");
const langBtnDoor = document.getElementById("lang-btn-door");
const langBtnDet = document.getElementById("lang-btn-details");
const rsvpForm = document.getElementById("rsvp-form");
const rsvpSuccess = document.getElementById("rsvp-success");
const particlesContainer = document.getElementById("particles");
const petalsWrap = document.getElementById("petals");

// Countdown elements
const daysSpan = document.getElementById("days");
const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");
const countdownMsgDiv = document.getElementById("countdownMsg");
const countdownMsgArDiv = document.getElementById("countdownMsgAr");

// ========== COUNTDOWN FUNCTION ==========
function updateCountdown() {
  const weddingTimestamp = new Date(CONFIG.weddingDateISO).getTime();
  const now = new Date().getTime();
  const distance = weddingTimestamp - now;

  if (distance <= 0) {
    if (daysSpan) daysSpan.innerText = "00";
    if (hoursSpan) hoursSpan.innerText = "00";
    if (minutesSpan) minutesSpan.innerText = "00";
    if (secondsSpan) secondsSpan.innerText = "00";
    if (countdownMsgDiv)
      countdownMsgDiv.innerText = "🎉 Today is the big day! 🎉";
    if (countdownMsgArDiv)
      countdownMsgArDiv.innerText = "🎉 اليوم هو يوم الزفاف الكبير! 🎉";
    if (countdownInterval) clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  if (daysSpan) daysSpan.innerText = days < 10 ? "0" + days : days;
  if (hoursSpan) hoursSpan.innerText = hours < 10 ? "0" + hours : hours;
  if (minutesSpan)
    minutesSpan.innerText = minutes < 10 ? "0" + minutes : minutes;
  if (secondsSpan)
    secondsSpan.innerText = seconds < 10 ? "0" + seconds : seconds;

  if (distance < 7 * 24 * 3600000 && distance > 0) {
    if (countdownMsgDiv)
      countdownMsgDiv.innerText = "❤️ Just around the corner! We can't wait ❤️";
    if (countdownMsgArDiv)
      countdownMsgArDiv.innerText = "❤️ على الأبواب! لا نستطيع الانتظار ❤️";
  } else {
    if (countdownMsgDiv && distance > 0)
      countdownMsgDiv.innerText = "✨ The celebration is approaching ✨";
    if (countdownMsgArDiv && distance > 0)
      countdownMsgArDiv.innerText = "✨ الاحتفال يقترب ✨";
  }
}

function startCountdownTimer() {
  updateCountdown();
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
}

// ========== INJECT DYNAMIC CONTENT ==========
function injectContent() {
  // الأسماء الأساسية
  document
    .querySelectorAll(".groom-name-en")
    .forEach((el) => (el.textContent = CONFIG.groomName));
  document
    .querySelectorAll(".bride-name-en")
    .forEach((el) => (el.textContent = CONFIG.brideName));
  document
    .querySelectorAll(".groom-name-ar")
    .forEach((el) => (el.textContent = CONFIG.groomNameAr));
  document
    .querySelectorAll(".bride-name-ar")
    .forEach((el) => (el.textContent = CONFIG.brideNameAr));

  // الجملة الجديدة تحت اللوجو (أسماء كاملة للدعوة)
  const invitePreNewEn = document.querySelector(".invite-pre-new.en-text");
  const invitePreNewAr = document.querySelector(".invite-pre-new.ar-text");
  if (invitePreNewEn) {
    invitePreNewEn.innerHTML = `The Alshaher family is honored to invite you to the wedding of their son<br /><strong>${CONFIG.groomFullNameForInvite}</strong> and <strong>${CONFIG.brideFullNameForInvite}</strong>`;
  }
  if (invitePreNewAr) {
    invitePreNewAr.innerHTML = `تِشَرَّف عائلة الشاهر بدعوة سيادتكم لحضور حفل زفاف نجلهم<br /><strong>${CONFIG.groomFullNameForInviteAr}</strong> والآنسة <strong>${CONFIG.brideFullNameForInviteAr}</strong>`;
  }

  // تفاصيل الكنيسة
  document
    .querySelectorAll(".church-name-en")
    .forEach((el) => (el.textContent = CONFIG.churchName));
  document
    .querySelectorAll(".church-name-ar")
    .forEach((el) => (el.textContent = CONFIG.churchNameAr));
  document
    .querySelectorAll(".church-time")
    .forEach((el) => (el.textContent = CONFIG.churchTime));
  document
    .querySelectorAll(".church-map-btn")
    .forEach((btn) => (btn.href = CONFIG.churchMapLink));

  // تفاصيل القاعة
  document
    .querySelectorAll(".venue-name-en")
    .forEach((el) => (el.textContent = CONFIG.venueName));
  document
    .querySelectorAll(".venue-name-ar")
    .forEach((el) => (el.textContent = CONFIG.venueNameAr));
  document
    .querySelectorAll(".venue-time")
    .forEach((el) => (el.textContent = CONFIG.venueTime));
  document
    .querySelectorAll(".venue-map-btn")
    .forEach((btn) => (btn.href = CONFIG.venueMapLink));

  // الخلفيات والشعار
  const doorStatic = document.querySelector(".door-static-bg");
  if (doorStatic)
    doorStatic.style.backgroundImage = `url('${CONFIG.doorStaticBg}')`;
  const detailsBgDiv = document.querySelector(".details-bg");
  if (detailsBgDiv)
    detailsBgDiv.style.backgroundImage = `url('${CONFIG.detailsBg}')`;
  document
    .querySelectorAll(".crest-img, #hero-crest-img")
    .forEach((img) => (img.src = CONFIG.crestImage));
}

// ========== AUDIO ==========
function initAudio() {
  bgMusic = document.getElementById("bg-music");
  if (CONFIG.musicUrl && bgMusic) {
    bgMusic.src = CONFIG.musicUrl;
    bgMusic.load();
    bgMusic.loop = true;
    bgMusic.volume = 0;
  }
}

function fadeInMusic(el, vol = 0.65, ms = 1500) {
  if (!el) return;
  el.volume = 0;
  el.play().catch((e) =>
    console.log("Audio autoplay blocked, will start on interaction"),
  );
  const step = vol / (ms / 50);
  const id = setInterval(() => {
    if (el.volume + step < vol) el.volume += step;
    else {
      el.volume = vol;
      clearInterval(id);
    }
  }, 50);
}

// ========== PARTICLES & PETALS ==========
function spawnParticles() {
  if (!particlesContainer) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 6 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 12 + 8}s;animation-delay:${Math.random() * 10}s;`;
    particlesContainer.appendChild(p);
  }
}

function spawnPetals() {
  if (!petalsWrap) return;
  petalsWrap.innerHTML = "";
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    const size = Math.random() * 8 + 4;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 18 + 12}s;animation-delay:${Math.random() * 14}s;`;
    petalsWrap.appendChild(p);
  }
}

// ========== PRELOADING ==========
const assetsToPreload = [
  CONFIG.crestImage,
  CONFIG.doorStaticBg,
  CONFIG.doorGif,
  CONFIG.detailsBg,
  CONFIG.musicUrl,
].filter(Boolean);

let loadProgress = 0;

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function setBar(target) {
  const from = loadProgress;
  const start = performance.now();
  const duration = 400;
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    loadProgress = from + (target - from) * easeInOut(t);
    if (loadingBar) loadingBar.style.width = loadProgress + "%";
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function preloadAllAssets() {
  const total = assetsToPreload.length;
  if (total === 0) return Promise.resolve();
  let loaded = 0;
  const BAR_START = 10,
    BAR_END = 90;
  function onAssetDone() {
    loaded++;
    const pct = BAR_START + (loaded / total) * (BAR_END - BAR_START);
    setBar(pct);
  }
  const promises = assetsToPreload.map((src) => {
    return new Promise((resolve) => {
      const isVideo = /\.(mp4|webm|mov)$/i.test(src);
      const isAudio = /\.(mp3|wav|ogg)$/i.test(src);
      if (isVideo) {
        const video = document.createElement("video");
        video.preload = "auto";
        video.src = src;
        video.load();
        const timeout = setTimeout(() => resolve(), 12000);
        video.addEventListener(
          "canplaythrough",
          () => {
            clearTimeout(timeout);
            onAssetDone();
            resolve();
          },
          { once: true },
        );
        video.addEventListener(
          "error",
          () => {
            clearTimeout(timeout);
            onAssetDone();
            resolve();
          },
          { once: true },
        );
      } else if (isAudio) {
        const audio = new Audio();
        audio.preload = "auto";
        audio.src = src;
        const timeout = setTimeout(() => resolve(), 12000);
        audio.addEventListener(
          "canplaythrough",
          () => {
            clearTimeout(timeout);
            onAssetDone();
            resolve();
          },
          { once: true },
        );
        audio.addEventListener(
          "error",
          () => {
            clearTimeout(timeout);
            onAssetDone();
            resolve();
          },
          { once: true },
        );
        audio.load();
      } else {
        const img = new Image();
        const timeout = setTimeout(() => resolve(), 12000);
        img.onload = img.onerror = () => {
          clearTimeout(timeout);
          onAssetDone();
          resolve();
        };
        img.src = src;
      }
    });
  });
  return Promise.all(promises);
}

async function runLoadingScreen() {
  setBar(10);
  spawnParticles();
  await Promise.all([
    preloadAllAssets(),
    new Promise((r) => setTimeout(r, 2000)),
  ]);
  setBar(100);
  await new Promise((r) => setTimeout(r, 600));
  transitionToPage(pageLoading, pageDoor);
}

function transitionToPage(fromPage, toPage, cb) {
  fromPage.classList.add("fade-out");
  setTimeout(() => {
    fromPage.classList.remove("active", "fade-out");
    toPage.classList.add("active");
    if (cb) cb();
  }, 900);
}

// ========== DOOR LOGIC ==========
function playDoor() {
  if (doorPlayed) return;
  doorPlayed = true;

  doorGif.src = CONFIG.doorGif;
  doorGif.load();
  doorGif.currentTime = 0;
  doorGif.muted = true;
  doorGif.play().catch((e) => console.warn("Video play error:", e));

  if (bgMusic && CONFIG.musicUrl) {
    bgMusic.currentTime = 0;
    fadeInMusic(bgMusic, 0.65, 1500);
  }

  const doorWrap = document.querySelector(".door-bg-wrap");
  if (doorWrap) doorWrap.classList.add("revealed");
  if (doorOverlay) doorOverlay.style.opacity = "0";
  if (doorGlowRing) doorGlowRing.classList.add("active");

  knockBtn.style.opacity = "0";
  knockBtn.style.pointerEvents = "none";
  knockBtn.style.transform = "scale(0.8)";

  let transitionDone = false;
  const goToDetails = () => {
    if (transitionDone) return;
    transitionDone = true;
    transitionToPage(pageDoor, pageDetails, () => {
      spawnPetals();
      startCountdownTimer();
    });
  };

  doorGif.addEventListener("ended", goToDetails, { once: true });
  setTimeout(goToDetails, 15000);
}

// ========== LANGUAGE TOGGLE ==========
function toggleLanguage() {
  currentLang = currentLang === "en" ? "ar" : "en";
  const html = document.documentElement;
  html.setAttribute("lang", currentLang);
  html.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");
  const nameEl = document.getElementById("rsvp-name");
  const msgEl = document.getElementById("rsvp-msg");
  if (nameEl)
    nameEl.placeholder = currentLang === "ar" ? "اسمك..." : "Your name...";
  if (msgEl)
    msgEl.placeholder =
      currentLang === "ar" ? "أمنياتك الطيبة..." : "Your warm wishes...";
}

// ========== RSVP HANDLER ==========
function handleRSVP(event) {
  event.preventDefault();
  const name = document.getElementById("rsvp-name").value.trim();
  const attendInput = document.querySelector('input[name="attend"]:checked');
  const message = document.getElementById("rsvp-msg").value.trim();

  if (!name) {
    alert(
      currentLang === "ar"
        ? "الرجاء إدخال اسمك الكامل."
        : "Please enter your full name.",
    );
    return false;
  }
  if (!attendInput) {
    alert(
      currentLang === "ar"
        ? "الرجاء اختيار حالة الحضور."
        : "Please confirm attendance.",
    );
    return false;
  }

  const attendText =
    attendInput.value === "yes"
      ? currentLang === "ar"
        ? "نعم، سأحضر 🥂"
        : "Yes, I will attend 🥂"
      : currentLang === "ar"
        ? "آسف، لن أتمكن من الحضور"
        : "Regretfully unable to attend";

  let fullMessage = `Guest name: ${name}\nAttendance: ${attendText}`;
  if (message) fullMessage += `\nMessage: ${message}`;
  currentWhatsAppMessage = fullMessage;

  rsvpForm.classList.add("hidden");
  rsvpSuccess.classList.remove("hidden");
  bindWhatsAppButtons();
  return false;
}

function bindWhatsAppButtons() {
  const groomBtn = document.getElementById("send-to-groom");
  const brideBtn = document.getElementById("send-to-bride");
  const copyBtn = document.getElementById("copy-message");

  if (groomBtn) {
    const newGroom = groomBtn.cloneNode(true);
    groomBtn.parentNode.replaceChild(newGroom, groomBtn);
    newGroom.onclick = () => {
      window.open(
        `https://wa.me/${CONFIG.groomWhatsappNumber}?text=${encodeURIComponent(currentWhatsAppMessage)}`,
        "_blank",
      );
    };
  }

  if (brideBtn) {
    const newBride = brideBtn.cloneNode(true);
    brideBtn.parentNode.replaceChild(newBride, brideBtn);
    newBride.onclick = () => {
      window.open(
        `https://wa.me/${CONFIG.brideWhatsappNumber}?text=${encodeURIComponent(currentWhatsAppMessage)}`,
        "_blank",
      );
    };
  }

  if (copyBtn) {
    const newCopy = copyBtn.cloneNode(true);
    copyBtn.parentNode.replaceChild(newCopy, copyBtn);
    newCopy.onclick = () => {
      navigator.clipboard
        .writeText(currentWhatsAppMessage)
        .then(() =>
          alert(currentLang === "ar" ? "تم نسخ الرسالة!" : "Message copied!"),
        )
        .catch(() =>
          alert(
            currentLang === "ar"
              ? "فشل النسخ، يمكنك نسخها يدوياً."
              : "Copy failed, please copy manually.",
          ),
        );
    };
  }
}

// ========== AUDIO AUTOPLAY WORKAROUND ==========
function enableAudioOnUserInteraction() {
  let activated = false;
  const enable = () => {
    if (activated) return;
    activated = true;
    if (bgMusic && bgMusic.paused && CONFIG.musicUrl) {
      bgMusic
        .play()
        .then(() => {
          bgMusic.pause();
          bgMusic.currentTime = 0;
        })
        .catch(() => {});
    }
    document.removeEventListener("click", enable);
    document.removeEventListener("touchstart", enable);
  };
  document.addEventListener("click", enable);
  document.addEventListener("touchstart", enable);
}

// ========== EVENT LISTENERS & INIT ==========
knockBtn.addEventListener("click", playDoor);
langBtnDoor.addEventListener("click", toggleLanguage);
langBtnDet.addEventListener("click", toggleLanguage);
if (rsvpForm) {
  rsvpForm.addEventListener("submit", handleRSVP);
}

enableAudioOnUserInteraction();

document.addEventListener("DOMContentLoaded", async () => {
  initAudio();
  injectContent();
  bindWhatsAppButtons();
  pageLoading.classList.add("active");
  if (doorGif) doorGif.removeAttribute("src");
  await runLoadingScreen();
});
