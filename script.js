let musicStarted = false;

document.addEventListener("click", function () {
  if (!musicStarted) {
    const music = document.getElementById("bgMusic");
    if (music) {
      music.play();
      musicStarted = true;
    }
  }
});
let noLevel = 0;
let chaseStart = null;
let revealClicks = 0;

function render(content) {
  document.getElementById("app").innerHTML = content;
}

function landing() {
  noLevel = 0;
  render(`
    <img src="panda-ponder.png">
    <h1>Hi Soumya, will you be my valentine?</h1>
    <button onclick="yesPage()">Yes</button>
    <button onclick="noFlow()">No</button>
  `);
}

function yesPage() {
  render(`
    <img src="panda-happy.png">
    <h1>So you're a simp huh? Try saying No this time.</h1>
    <button onclick="landing()">Try Again</button>
  `);
}

function noFlow() {
  noLevel++;

  const data = [
    {img:"panda-sad3.png", text:"Are you sure? 🥹🥹"},
    {img:"panda-sad5.png", text:"Please be my valentine?? 🥹🥹🥹🥹🥹"},
    {img:"panda-sad8.png", text:"Why are you being so mean?? 🥹🥹🥹🥹🥹"},
    {img:"panda-sad9.png", text:"Please!?! I will buy you chips and sing you songs?? 🥹🥹🥹🥹🥹"},
  ];

  if(noLevel <= 4){
    let scale = 1 - (noLevel * 0.2);

    render(`
      <img src="${data[noLevel-1].img}">
      <h1>${data[noLevel-1].text}</h1>
      <button onclick="yesPage()">Yes</button>
      <button onclick="noFlow()" style="transform: scale(${scale})">No</button>
    `);
  } else {
    runawayStage();
  }
}

function runawayStage(){
  render(`
    <img src="panda-sad100.png">
    <h1>Final offer:: What if I offer to love you always, and spend all my energy to tell you, show you, just how much you mean to me on a daily basis? Please say yes and bring sunshine in my life and give me a chance to bring happiness in your life just like how you do, please?</h1>
    <button id="yesBtn" disabled>Yes</button>
    <button id="noBtn">No</button>
  `);

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  noBtn.style.position = "absolute";

  let startTime = null;

  noBtn.addEventListener("mouseover", () => {

    if(!startTime) startTime = Date.now();

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    if(Date.now() - startTime > 5000){
      yesBtn.disabled = false;
      yesBtn.onclick = finalPage;
    }
  });
}

function finalPage(){
  revealClicks = 0;

  render(`
    <div style="text-align:center; position:relative;">

      <h1>
        I always knew you would say yes 🤭🤭🤭! <br>
        Now click the image three times to reveal just how excited I am to be your valentine!!
      </h1>

      <div style="margin-top:30px;">
        <img src="final-image.jpeg"
             id="finalImg"
             class="blur"
             style="width:350px; cursor:pointer;">
      </div>

      <div id="fullscreenText"
           style="
           position:fixed;
           top:0;
           left:0;
           width:100%;
           height:100%;
           background:#ffd6e0;
           display:none;
           align-items:center;
           justify-content:center;
           flex-direction:column;
           font-size:90px;
           font-weight:bold;
           color:#ff4d88;
           z-index:999;
           ">
      </div>

    </div>
  `);

  document.getElementById("finalImg").addEventListener("click", reveal);
}


function reveal(){

  revealClicks++;

  const overlay = document.getElementById("fullscreenText");
  const img = document.getElementById("finalImg");

  overlay.style.display = "flex";

  if(revealClicks === 1){
    overlay.innerHTML = `
      I
      <div style="font-size:25px; margin-top:20px;">two clicks left</div>
    `;
    setTimeout(()=> overlay.style.display = "none", 1200);
  }

  else if(revealClicks === 2){
    overlay.innerHTML = `
      LOVE
      <div style="font-size:25px; margin-top:20px;">just one more!</div>
    `;
    setTimeout(()=> overlay.style.display = "none", 1200);
  }

  else if(revealClicks === 3){
    overlay.innerHTML = `YOU`;

    setTimeout(()=>{
      overlay.style.display = "none";
      img.classList.remove("blur");

      img.style.transition = "1.5s ease";
      img.style.transform = "scale(1.1)";

      setTimeout(()=>{
        img.style.transform = "scale(1)";
      },1500);

    },1200);
  }
}


landing();



