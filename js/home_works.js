// CHECKER GMAIL

let gmail_input = document.querySelector("#gmail_input");
let gmail_button = document.querySelector("#gmail_button");
let checker = document.querySelector(".checker");

let reGExp = /^[a-zA-Z]\w{3,}@gmail\.com$/;

gmail_button.onclick = () => {
  if (reGExp.test(gmail_input.value)) {
    checker.innerHTML = "OK";
    checker.style.color = "blue";
  } else {
    checker.innerHTML = "Error";
    checker.style.color = "red";
  }
};

//-----------------------------------------------------------------------

// MOVE BLOCK
let parent_block = document.querySelector(".parent_block");

let child_block = document.querySelector(".child_block");

let pixelsX = 0,
  pixelsY = 0;

const offsetWidth = parent_block.clientWidth - child_block.offsetWidth;
const offsetHeight = parent_block.clientHeight - child_block.offsetHeight;

let Move = () => {
  child_block.style.left = `${pixelsX}px`;
  child_block.style.top = `${pixelsY}px`;

  if (pixelsX < offsetWidth && pixelsY === 0) {
    pixelsX++;
  } else if (pixelsX >= offsetWidth && pixelsY < offsetHeight) {
    pixelsY++;
  } else if (pixelsY >= offsetHeight && pixelsX > 0) {
    pixelsX--;
  } else if (pixelsX === 0 && pixelsY > 0) {
    pixelsY--;
  }

  requestAnimationFrame(Move);
};

Move();

//   --------------------------------------------------------------------------------------------------------

// STOPWATCH

let seconds = document.querySelector("#seconds");

const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");

let setIntervalSec;
let counter = 0;

start.addEventListener("click", () => {
  if (!setIntervalSec) {
    setIntervalSec = setInterval(() => {
      counter++;
      seconds.innerHTML = `${counter}`;
    }, 1000);
  }
});

stop.onclick = () => {
  clearInterval(setIntervalSec);
  setIntervalSec = null;
};

reset.onclick = () => {
  clearInterval(setIntervalSec);
  setIntervalSec = null;
  counter = 0;
  seconds.innerHTML = `${counter}`;
};

// FINISH

// --------------------------------------------------------------------------

let modalShown = false;
window.addEventListener("scroll", () => {
  if (modalShown) return;
  const windowHeight = window.innerHeight;
  const scrollTop = window.scrollY || window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= docHeight - 5) {
    showModal();
    modalShown = true;
  }
});

function showModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "block";
}



// -------------------------------------------------------------------------------------



function characters() {
  const character = new XMLHttpRequest();
  character.open("GET", "../data/characters.json");
  character.setRequestHeader("content-type", "application/json");
  character.send();

  character.onload = () => {
    const Data = JSON.parse(character.response);
    let characters_list = document.querySelector(".characters-list");

    Data.forEach((char) => {


      const character_card = document.createElement("div");
      character_card.classList.add(".character-card");

      const Name = document.createElement("h2");
      Name.style.textAlign = 'start'
      Name.innerText = char.name;

      const Age = document.createElement("p");
      Age.style.color = 'white'
      Age.innerText = `age ${char.age}`;

      const div_photo = document.createElement('div');
      div_photo.classList.add('character-photo')


      const Img = document.createElement("img");
      Img.src = char.character_photo ? char.character_photo : 'https://i.pinimg.com/474x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg';
      Img.alt = char.name;

      div_photo.appendChild(Img)

      character_card.appendChild(Name);
      character_card.appendChild(Age);
      character_card.appendChild(div_photo);
      
      characters_list.appendChild(character_card);
    });
  };
}
characters();
