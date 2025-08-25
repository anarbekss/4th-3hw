// TAB SLIDER

const tabContentBlock = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const TabParent = document.querySelector(".tab_content_items")

const hideTabContent = () => {
  tabContentBlock.forEach((element) => {
    element.classList.add('hide');
    element.style.display = "none";
    
  });
  tabs.forEach((tab) => {
    tab.classList.remove('tab_content_item_active');
  });
  
  
};

const showTabContent = (index = 0) => {
    tabContentBlock[index].style.display = 'block'
    setTimeout(() => {
      tabContentBlock[index].classList.remove('hide');
    }, 40);
    tabs[index].classList.add('tab_content_item_active')
};

hideTabContent();
showTabContent() 

// ----------------------AUTOSLIDER-----------------

let sliderId = 0 

const slider = (i = 0) => {
   sliderId = setInterval(() => {
    i++
    if (i >= tabs.length ) {
      i = 0
    }
    hideTabContent()
    showTabContent(i)
    
  }, 2000)
}

slider()
//-------------------------------------------------------------

TabParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                hideTabContent()
                showTabContent(tabIndex)
                clearInterval(sliderId)
                slider(tabIndex)
            }
        })
    }
}

// -------------------------------------------------------------------------- 

let modalShown = false;
window.addEventListener('scroll', () => {
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
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
}


// CONVERTER----------------------------------------------------------

const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');


const converter = (element) => {
  element.oninput = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '../data/converter.json');
    request.setRequestHeader('Content-type', 'application/json');
    request.send();

    request.onload = () => {
      const data = JSON.parse(request.response);
      if (element.id === 'som') {
        usdInput.value = (element.value / data.usd).toFixed(2);
        eurInput.value = (element.value / data.eur).toFixed(2);
      }

      if (element.id === 'usd') {
        somInput.value = (element.value * data.usd).toFixed(2);
        eurInput.value = (element.value * (data.usd / data.eur)).toFixed(2);
      }

      if (element.id === 'eur') {
        somInput.value = (element.value * data.eur).toFixed(2);
        usdInput.value = (element.value * (data.eur / data.usd)).toFixed(2);
      }
      if (element.value === '') {
        usdInput.value = ''
        somInput.value = ''
        eurInput.value = ''
      }
    }
  }
}

converter(usdInput);
converter(somInput);
converter(eurInput  )









const BtnNext = document.querySelector('#btn-next');
const BtnPrev = document.querySelector('#btn-prev');
const card = document.querySelector('.card');

let CardId = 1;

function loadCard(id) {
  if (id < 1) id = 200;
  if (id > 200) id = 1;
  CardId = id;

  fetch(`https://jsonplaceholder.typicode.com/todos/${CardId}`)
    .then(response => response.json())
    .then(data => {
      const { title, id, completed } = data;
      const color = completed ? 'green' : 'red';
      card.innerHTML = `
        <p><b>ID:</b> ${id}</p>
        <p><b>Title:</b> ${title}</p>
        <p style="color:${color}"><b>Status:</b> ${completed ? 'True' : 'false'}</p>
      `;
    })
    .catch(err => {
      console.error(err);
      card.innerHTML = `<p>Ошибка загрузки...</p>`;
    });
}

BtnNext.onclick = () => loadCard(CardId + 1);
BtnPrev.onclick = () => loadCard(CardId - 1);


loadCard(CardId);





