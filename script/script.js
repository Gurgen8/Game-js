///////////////////////////////// Variables /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let rabbitTable = document.querySelector(".rabbitTable");
boxes = document.getElementsByClassName("box"),
  modul = document.querySelector(".modul"),
  start = document.querySelector(".start"),
  rabbitChange = document.getElementsByClassName('rabbit'),
  refreshBtn = document.getElementById("refresh-page"),
  btnDown = document.getElementById("down"),
  btnUp = document.getElementById("up"),
  btnLeft = document.getElementById("left"),
  btnRight = document.getElementById("right"),
  changeBtn = document.getElementById("change-table"),
  board = document.querySelector(".rabbitTable"),
  wolColection = document.getElementsByClassName('wolves')
let table = {
  rowsCols: JSON.parse(localStorage.getItem("board")) === true ? 20 : 10,
  boxes: JSON.parse(localStorage.getItem("board")) == true ? 20 * 20 : 10 * 10
};
JSON.parse(localStorage.getItem("board")) == true ? board.style.width = "800px" : board.style.width = "400px"
JSON.parse(localStorage.getItem("board")) == true ? board.style.height = "800px" : board.style.height = "400px"


/////////////////////////////////////// Persons and heroes game ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///rabbit (hero)
const rabbit = {
  direction: "right",
  house: 0,
  score: 0,
  time: 0,
  heart: 0,
  canTurn: 0,
  x: Math.floor(Math.random() * table.rowsCols),
  y: Math.floor(Math.random() * table.rowsCols),
  init: function () {
    this.position = [[this.x, this.y], [this.x, this.y]];
    this.house = 0;
    this.score = 0;
    this.time = 0;
    this.heart = 0;
    this.canTurn = 0;
    rabbitTable.innerHTML = "";
    tableCreation();
  }
};



//wolves
const wolves = {
  direction: "right",
  x: Math.floor(Math.random() * table.rowsCols),
  y: Math.floor(Math.random() * table.rowsCols),
  z: Math.floor(Math.random() * table.rowsCols),
  a: Math.floor(Math.random() * table.rowsCols),
  b: Math.floor(Math.random() * table.rowsCols),
  c: Math.floor(Math.random() * table.rowsCols),
  d: Math.floor(Math.random() * table.rowsCols),
  e: Math.floor(Math.random() * table.rowsCols),
  f: Math.floor(Math.random() * table.rowsCols),
  g: Math.floor(Math.random() * table.rowsCols),
  h: Math.floor(Math.random() * table.rowsCols),
  k: Math.floor(Math.random() * table.rowsCols),
  v: Math.floor(Math.random() * table.rowsCols),
  w: Math.floor(Math.random() * table.rowsCols),
  init: function () {
    this.position = localStorage.getItem('board')
      ? [[this.b, this.y], [this.x, this.w], [this.b, this.e], [this.c, this.y], [this.b, this.x], [this.a, this.c], [this.b, this.d], [this.v, this.z], [this.c, this.w], [this.k, this.h], [this.f, this.g], [this.c, this.z]]
      : [[this.w, this.e], [this.k, this.f], [this.v, this.a], [this.g, this.y], [this.b, this.x], [this.h, this.c]];
  }
};

// init game
rabbit.init();
wolves.init();



///////////////////////////////////////////////////////// Update - positions ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function updateWolwesPos() {

  const box = [...boxes];
  

  wolves.position.map(w => {

   if (rabbit.position[0][0] < w[0]) {

      return w[0] = w[0] - 1

    } else if (rabbit.position[0][0] > w[0]) {
      return w[0] = w[0] + 1
    }

  })

  wolves.position.map(w => {

    if (rabbit.position[0][1] < w[1] && wolves.position[0][0] !== table.rowsCols) {

      return w[1] = w[1] - 1
    } else if (rabbit.position[0][1] > w[1]) {

      return w[1] = w[1] + 1
    }

  })

  box.map(b => {
    if (b.classList.value === "box wolves rabbit" || b.classList.value === "box rabbit wolves" || b.classList.value === "box fence rabbit wolves"|| b.classList.value === "box trap rabbit") {
      rabbit.heart--
      scoreHeart.innerHTML = rabbit.heart;
      rabbit.heart < 0 ? stopp() : rabbit.position[0][0] = 5; rabbit.position[0][1] = 5;

    } 
    return b.classList.remove("wolves")
  })

  randomwolves()

};


function updatePositions() {

  (rabbitChange?.item(0) ? rabbitChange?.item(0).classList.remove('rabbit') : null)
  rabbit.position.shift();
  const box = [...boxes];
  let head = rabbit.position[rabbit.position.length - 1];




  ///hit-border-rabbit
  if (rabbit.position[0][1] === table.rowsCols) {
    rabbit.position[0][1] = 0
  } else if (rabbit.position[0][1] < 0) {
    rabbit.position[0][1] = table.rowsCols
  } else if (rabbit.position[0][0] > table.rowsCols) {
    rabbit.position[0][0] = 0
  } else if (rabbit.position[0][0] <= 0) {
    rabbit.position[0][0] = table.rowsCols
  }else if (rabbit.position[0][0] === table.rowsCols) {
    wolves.position.map(w => {
      w[0] = w[0] - 2
    
    })

  }


  // add new rabbit part

  switch (rabbit.direction) {
    case "left":

      rabbit.position.push([head[0] - 1, head[1]]);
      rabbitChange.item(1) ? rabbitChange.item(1).classList.remove("rabbit") : null

      break;
    case "up":

      rabbit.position.push([head[0], head[1] - 1]);

      break;
    case "right":

      rabbit.position.push([head[0] + 1, head[1]]);
      rabbitChange.item(1) ? rabbitChange.item(1).classList.remove("rabbit") : null

      break;
    case "down":

      rabbit.position.push([head[0], head[1] + 1]);

      break;
    default:
      console.log("no direction !");
  }

  boxes[rabbit.position[0][0] + rabbit.position[0][1] * table.rowsCols].classList.add("rabbit");

  box.map(b => {
    if (b.classList.value === "box wolves rabbit" || b.classList.value === "box rabbit wolves" || b.classList.value === "box fence rabbit wolves" || b.classList.value === "box trap rabbit") {
      rabbit.heart--
      scoreHeart.innerHTML = rabbit.heart;
      rabbit.heart < 0 ? stopp() : rabbit.position[0][0] = 5; rabbit.position[0][1] = 5;
    } else if (b.classList.value === "box fence rabbit") {

       b.classList.remove('fence')
       b.classList.add("trap")

    }
  });

};




//-touch -btns
btnDown.addEventListener("click", () => {
  hithouse();
  rabbit.direction = "down"
  updateWolwesPos()
  updatePositions();
  renderrabbit();
  hitheart()
});

btnUp.addEventListener("click", () => {
  hithouse();
  rabbit.direction = "up"
  updateWolwesPos()
  updatePositions();
  renderrabbit();
  hitheart()

});

btnLeft.addEventListener("click", () => {
  hithouse();
  rabbit.direction = "left"
  updateWolwesPos()
  updatePositions();
  renderrabbit();
  hitheart()

});

btnRight.addEventListener("click", () => {
  hithouse();
  rabbit.direction = "right"
  updateWolwesPos()
  updatePositions();
  renderrabbit();
  hitheart()

});




//////////////////////////////////////////////////////////////// Checks house, heart, wolves -- contacts ////////////////////////////////////////////////////////////////////////////



///House-hit
function hithouse() {
  let head = rabbit.position[rabbit.position.length - 1];
  if (head.toString() === housePos.toString() || boxes[random].classList.contains('rabbit')) {
    ///rabbit add ... +
    //  let tail = rabbit.position[0]
    //  rabbit.position.unshift(tail);
    randomwolves()
    boxes[random].classList.remove("house");
    randomhouse();
    rabbit.house++;
    rabbit.score += rabbit.house;
    scoreElt.innerHTML = rabbit.house + "points";;
  }
};


///Heart hit
function hitheart() {

  if (rabbitChange[0].classList.contains('heart')) {
    boxes[random].classList.remove("heart");
    rabbit.heart++
    scoreHeart.innerHTML = rabbit.heart;
    rabbitChange[0].classList.remove('heart')
  }

};



//////////////////////////////////////////////////// Random position wolves, rabbit, house, hearts /////////////////////////////////////////////////////////////////////////////////////////



// 'wolves' position
function randomwolves() {
  const box = [...boxes]
  for (let i = 0; i < wolves.position.length; i++) {
    box.map(b => {
      if (b.classList.value === "box rabbit") {
        rabbit.position[0][1] = 5;
        rabbit.position[0][0] = 5
      } else {

        return boxes[wolves.position[i][0] + wolves.position[i][1] * table.rowsCols].classList.add("wolves");
      }
    }
    )

  }

};



// 'rabbit' position
function renderrabbit() {
  const box = [...boxes]
  for (let i = 0; i < rabbit.position.length; i++) {
    (rabbitChange?.item(0) ? rabbitChange?.item(0).classList.remove('rabbit') : null)
    boxes[rabbit?.position[i][0] + rabbit?.position[i][1] * table.rowsCols].classList.add("rabbit");

  };

};


//'house'  position 
function randomhouse() {
  let x, y;
  const arr = []
  const box = [...boxes]

  if (rabbit.house % 5 == 1) {
    getHeart()
  }
  /// correcet position  house
  box.map((b, item) => {
    if (b.classList.value === "box fence" || b.classList.value === 'box rabbit' || b.classList.value === 'box wolves' || b.classList.value === "box trap" ) {
      null
    } else {
      arr.push(item)
    }
  })

  arr.map(i => {
    if ((i + "").length === 1 && i !== 0) {
      return ("0" + i)
    }
  })
  ///iterable position (random-house and x,y)
  random = arr[Math.floor((Math.random() * arr.length))];
  x = [...(random + "")][0]
  y = (([...(random + "")][1]) + '').length ? [...(random + "")][1] : 0
  boxes[random].classList.add('house')
  housePos = y === undefined ? [+x, [...(random + "")][1] === undefined ? 0 : + y] : [+x, [...(random + "")][1] === undefined ? 0 : + y].reverse()

};


// 'heart'  position
function getHeart() {
  let heartPositions = getRandom(boxes, 1)
  heartPositions.map(f => {
    return f.classList.add('heart')
  })
  const box = [...boxes];
  setTimeout(() => {
    box.map(b => {
      b.classList.remove('heart')
    })
  }, 10000)
};


// 'fence' position 
function randomFence() {
  let fencePositions = getRandom(boxes, localStorage.getItem('board') ? 40 : 10)
  fencePositions.map(f => {
    return f.classList.add('fence')
  })
};



/////////////////////////////////////////////////// Game --- table creation //////////////////////////////////////////////////////////////////////////////////////////////////////////



function tableCreation() {

  if (rabbitTable.innerHTML === "") {
    // main table
    for (let i = 0; i < table.boxes; i++) {
      let divElt = document.createElement("div");
      divElt.classList.add("box");
      rabbitTable.appendChild(divElt);
    }

    // status bar
    let statusElt = document.createElement("div");
    statusElt.classList.add("status");
    rabbitTable.appendChild(statusElt);

    ///score-points
    scoreElt = document.createElement("span");
    scoreElt.classList.add("score");
    scoreElt.innerHTML = rabbit.score + " points";
    statusElt.appendChild(scoreElt);

    ///score-heart
    heartDiv = document.createElement("div")
    heartDiv.classList.add('heartDiv')
    heartImg = document.createElement('img')
    heartImg.classList.add('heartImage')
    heartImg.src = "../img/heart.png"
    scoreHeart = document.createElement("span");
    scoreHeart.classList.add("scoreHeart");
    scoreHeart.innerHTML = rabbit.heart;
    heartDiv.appendChild(scoreHeart);
    heartDiv.appendChild(heartImg);
    statusElt.appendChild(heartDiv)


  }
};


///////////////////////////////////////////// Game start and end ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///start-click
start.addEventListener("click", startrabbit);

// start game
function startrabbit() {
  modul.classList.add("hidden");
  rabbit.time = 1;
  randomFence();
  renderrabbit();
  randomhouse();
  randomwolves();
};


// end  game
function stopp() {
  rabbit.final = rabbit.score;
  start.querySelector("span").innerHTML = rabbit.house + " Points !";
  setTimeout(function () {
    start.querySelector("span").innerHTML = "Play game";
    window.location.reload()

  }, 800);
  rabbit.init();
  modul.classList.remove("hidden");

};



////////////////////////////////////////////// Change big and small board ---GENERATE RANDOM ITEMS- FUNCTION --refresh page  ////////////////////////////////////////////////////////////////////////////


//change-board
changeBtn.addEventListener("click", () => {
  if (JSON.parse(localStorage.getItem("board")) == true) {
    localStorage.removeItem("board")
  } else {
    localStorage.setItem("board", true)
  }
  window.location.reload()
});


//refresh
refreshBtn.addEventListener("click", () => {
  return window.location.reload()
});


///function----generate-random-box-div
function getRandom(arr, n) {
  let result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    console.log("invalid arguments")
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

