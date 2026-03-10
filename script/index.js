const createElements = (arr) => {
  if (!arr || arr.length === 0) {
    return `<span class="font-bangla">কোনো সমার্থক খুঁজে পাওয়া যায়নি</span>`
  } else {
    const htmlElements = arr.map(el => `<span class="btn btn-soft btn-info my-3">${el}</span>`);
    return htmlElements.join(" ");
  }
};

// pronounceWord function
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN";
  window.speechSynthesis.speak(utterance);
};

// manageSpinner function
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');
  } else {
    document.getElementById('word-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
};

// loadLesson function
const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLessons(json.data));
};

// removeActive function
const removeActive = () => {
  const lessonButtons = document.querySelectorAll('.lesson-btn');
  lessonButtons.forEach(btn => btn.classList.remove('active'));
};

// loadLevelWord function
const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add('active');
      displayLevelWord(data.data);
    });
};

// loadWordDetail function
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

// displayWordDetails function
const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById('details-container');
  detailsBox.innerHTML = `
        <div class="">
          <h2 class="text-2xl font-bold font-bangla">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
        </div>

        <div class="">
          <h2 class="font-bold">Meaning</h2>
          <p class="font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
        </div>

        <div class="">
          <h2 class="font-bold">Example</h2>
          <p>${word.sentence}</p>
        </div>

        <div class="">
          <h2 class="font-bold">Synonyms</h2>
              <div class="">${createElements(word.synonyms)}</div>
        </div>
  `
  document.getElementById('word_modal').showModal();
};

// displayLevelWord function
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla bg-gradient-to-br from-slate-400 to-red-200">
        <img class="mx-auto" src="./assets/alert-error.png" />
        <p class="text-lg md:text-xl font-medium text-gray-500 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-semibold md:font-bold text-2xl md:text-4xl font-bangla">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    manageSpinner(false);
    return;
  }

  words.forEach(word => {
    const card = document.createElement('div');
    card.innerHTML = `
        <div class="rounded-xl shadow-sm text-center py-10 px-5 space-y-4 bg-gradient-to-br from-slate-200 to-sky-300">
          <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="font-semibold">Meaning / Pronunciation</p>
          
          <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</div>
          <div class="flex justify-between items-center">
              <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
              <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>  
          </div>
       </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

// displayLesson function
const displayLessons = (lessons) => {
  const levelContainer = document.getElementById('level-container');
  levelContainer.innerHTML = "";
  for (const lesson of lessons) {
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no} </button>
    `
    levelContainer.append(btnDiv);
  }

};

loadLessons();

// search functionality
document.getElementById('btn-search').addEventListener('click', () => {
  removeActive();
  const input = document.getElementById('input-search');
  const searchValue = input.value.trim().toLowerCase();

  if (searchValue === "") {
    alert('প্রথমে শব্দ লিখুন')
    return
  }

  manageSpinner(true);

  fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res => res.json())
    .then(data => {
      const allWords = data.data;
      console.log(allWords);
      const filterWords = allWords.filter(word => word.word && word.word.toLowerCase().includes(searchValue));
      displayLevelWord(filterWords);

      input.value = "";
    });
});

// login functionality 
const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', () => {
  const user = document.getElementById('user');
  const pass = document.getElementById('pass');
  if (user.value === "e-janala" && pass.value === "123456") {
    document.getElementById('hero').classList.add('hidden');

    document.getElementById('navbar').classList.remove('primarily-hidden');
    document.getElementById('level-section').classList.remove('primarily-hidden');
    document.getElementById('search').classList.remove('primarily-hidden');
    document.getElementById('word-container').classList.remove('primarily-hidden');
    document.getElementById('faq-section').classList.remove('primarily-hidden');
    user.value = "";
    pass.value = "";
  } else {
    alert('Invalid Username or Password');
  };
});