const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
  .then(res => res.json())
  .then(json => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById('word-container');
  // wordContainer.innerHTML = "";

  words.forEach(word => {
    console.log(word);
    const card = document.createElement('div');
    card.innerHTML = `
        <p>cat</p>
    `;
    wordContainer.append(card);
  });
};

displayLessons = (lessons) => {
  // step 1: get the container
  const levelContainer = document.getElementById('level-container');
  levelContainer.innerHTML = "";
  // step 2: get into every lessons
  for (const lesson of lessons) {
    // step 3: create element
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no} </button>
    `
    // step 4: append into container
    levelContainer.append(btnDiv);
  }
  
};
loadLessons();