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
  setTimeout(() => {
    element.style.display = 'none';
  }, 500);
  
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
    if (i > tabs.length - 1) {
      i = 0
    }
    hideTabContent()
    showTabContent(i)
    
  }, 5000)
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


let modalShown = false; // флаг — показали ли модалку

window.addEventListener('scroll', () => {
  if (modalShown) return; // если уже показали — выходим

  const windowHeight = window.innerHeight;
  const scrollTop = window.scrollY || window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= docHeight - 5) {
    showModal();
    modalShown = true; // больше не показываем
  }
});

function showModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
}





