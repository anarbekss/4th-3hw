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
  
    Move()
  
  
  //   --------------------------------------------------------------------------------------------------------
  
  
  // STOPWATCH 
  
    let seconds = document.querySelector('#seconds');
  
    const start = document.querySelector('#start');
    const stop = document.querySelector('#stop');
    const reset = document.querySelector('#reset');
  
  
    let setIntervalSec;
    let counter = 0
  
    start.addEventListener('click', () => {
      if (!setIntervalSec) {
         setIntervalSec = setInterval(() => {
              counter++
              seconds.innerHTML = `${counter}`
          },1000)
      }
    })
  
    stop.onclick = () => {
      clearInterval(setIntervalSec);
      setIntervalSec = null; 
    };
    
  
    reset.onclick = () => {
      clearInterval(setIntervalSec)
      setIntervalSec = null
      counter = 0 
      seconds.innerHTML = `${counter}`
    }
  
  
    // FINISH