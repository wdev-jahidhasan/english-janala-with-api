const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
  .then(res => res.json())
  .then(json => displayLessons(json.data));
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
        <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no} </button>
    `
    // step 4: append into container
    levelContainer.append(btnDiv);
  }
  
};
loadLessons();