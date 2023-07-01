const word = document.getElementById("word");
const search = document.getElementById("search");
const mean = document.querySelector(".mean-text");
const text = document.querySelector(".text");
const nam = document.querySelector(".word");
const meaning = document.querySelector(".meaning");
const play = document.getElementById("mean");
const play1 = document.getElementById("txt");
const wrong = document.querySelector(".wrong");
const msg = document.querySelector(".msg");
let val;
let audio = "",
  len;
search.addEventListener("click", () => {
  //audio.pause();
  val = word.value;
  if (val == "" || val == null) {
    nam.style.display = "none";
    meaning.style.display = "none";
    wrong.style.display = "none";
    msg.style.display = "block";
  } else {
    msg.style.display = "none";
    wrong.style.display = "none";
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${val}`;
    let p = fetch(url);
    p.then((v) => {
      return v.json();
    })
      .then((value) => {
        console.log(value);
        console.log(value[0].meanings[0].definitions[0].definition);
        text.innerHTML = `Word: ${value[0].word}`;
        mean.innerHTML = `Meaning: ${value[0].meanings[0].definitions[0].definition}`;
        len = Object.keys(value[0].phonetics).length;
        nam.style.display = "block";
        meaning.style.display = "block";
        word.value="";
      })
      .catch((v) => {
        nam.style.display = "none";
        meaning.style.display = "none";
        msg.style.display="none";
        wrong.style.display = "block";
        word.value="";
      });
  }
});
play.addEventListener("click", () => {
  const speech = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(`${mean.innerHTML}`);
  setTimeout(() => {
    speech.speak(utterance);
  }, 1000);
});
play1.addEventListener("click", () => {
  const speech = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text.innerHTML);
  setTimeout(() => {
    speech.speak(utterance);
  }, 1000);
});
