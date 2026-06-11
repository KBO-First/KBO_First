const startBtn = document.getElementById("start-btn");

const start = document.getElementById("start");
const ready = document.getElementById("ready");
const countdown = document.getElementById("countdown");
const play = document.getElementById("play");

const result = document.getElementById("result");

let CD = null
let time = 0


// 시작화면 -> 준비
startBtn.addEventListener("click", () => {
  start.classList.add("is-hidden")
  ready.classList.remove("is-hidden")
  readyCD()
});

const scrollTarget = document.getElementById("sh3")

// 준비 -> 게임
function readyCD() { //진행 순서: 3(즉시) -> 2 -> 1 -> START! -> 게임 플레이 섹션
  time = 2
  CD = setInterval(() => { 
    if (countdown.textContent == 'START!') {
      clearInterval(CD)
      ready.classList.add("is-hidden")
      play.classList.remove("is-hidden")
      scrollTarget.scrollIntoView();
      playCD()
    }else if (time == 0) {
      countdown.textContent = 'START!'
    }else {
      countdown.textContent = time
      time --
    }
  }, 1000)
}



// 타이머
const timeNum = document.getElementById("time-num")
const timeLeft = document.getElementById("time-left")

let bar = 100

function updateTimer() { // 제한시간이 1분이며 최소 1초가 지난 뒤에만 사용되는 함수이므로 분 단위 표기법은 적용하지 않았다.
  const secStr = String(time).padStart(2, "0");
  timeNum.textContent = "00:" + secStr;
}

function playCD() {
  time = 60
  randomTimer()
  CD = setInterval(() => {
    time --
    updateTimer()
    if (time <= 0) {
      alert("끝!")
      clearInterval(CD)
      CD = null

      showResult()
    }else {
      if (time % 3 == 1) { //3의 배수 + 1초마다 시간 게이지가 5%씩 감소. 남은 시간을 시각적으로 보여준다.
        bar = (time - 1) * 5 / 3
        timeLeft.style.width = bar + "%"
      }
    }
    
  }, 1000);
}


// 성공 & 실패


let cleared = false // 클리어시 true로 변경, 게임 오버시 유지. 이 값에 따라 결과창을 다르게 보여줌.

const sCount = document.getElementById("success-count")
const mCount = document.getElementById("miss-count")
const cir1 = document.getElementById("circle1")
const cir2 = document.getElementById("circle2")
const cir3 = document.getElementById("circle3")
let circle = [cir1,cir2,cir3]

let s = 0
let m = 0

function success() { //성공시, s를 1 늘리고 10이 되면 클리어
  if (Number(sCount.textContent) <= 9) {
    s ++
    sCount.textContent = s
    if (s >= 10) {
      clearInterval(CD)
      CD = null
      alert("성공!")

      cleared = true
      showResult()
    }
  }
}

function miss() { //실패시, m을 1 늘리고 3이 되면 게임 오버
  if (m <= 2) {
    m ++
    mCount.textContent = m
    circle[m - 1].classList.add("missed")
    circle[m - 1].classList.remove("circle")
    if (m >= 3) {
      clearInterval(CD)
      CD = null
      alert("실패!")

      showResult()
    }
  }
}


// 좌석 버튼 관련

const seat = document.getElementsByClassName("seat")

for (let i = 0; i < 60; i ++) { // 그리드 셀 60개 전부에 EventListener를 추가
  seat[i].addEventListener("click", () => {

    if (seat[i].classList.contains("seat-target") || seat[i].classList.contains("seat-target-blink")) { // 타겟 칸 클릭시 성공 처리
      seat[i].classList.remove("seat-target")
      seat[i].classList.remove("seat-target-blink")
      seat[i].classList.add("seat-success")
      seat[i].textContent = "✓"
      success()
    } else if (seat[i].classList.contains("seat-success") || seat[i].classList.contains("seat-miss")) { //이미 성공 or 실패한 칸은 건드려도 반응 없음
    } else if (seat[i].classList.contains("seat-late")) { // 타겟이 소멸해 X표시가 뜬 칸을 클릭했을 경우, 실패 처리
      seat[i].classList.remove("seat-late")
      seat[i].textContent = ""
      seat[i].classList.add("seat-miss")
      miss()
    } else { // 그냥 빈칸을 클릭했을 경우, 실패 처리
      seat[i].classList.add("seat-miss")
      miss()
    }
  })
}


let ran = 0
let tar1 = null, tar2 = null, tar3 = null, tar4 = null, tar5 = null
let targetMadeTotal = 0
const targets = [tar1, tar2, tar3, tar4, tar5] // 타겟 여럿이 동시 출현할 때의 충돌 문제를 회피하기 위해 setInterval의 대상을 5개로 만들었다.

function randomTarget() {
  ran = Math.floor(Math.random() * 60) //0~59 랜덤. 
  if (seat[ran].classList.length <= 1) { //해당 칸이 완전한 빈칸이어야만 실행, 아니라면 재시도

    const seatNow = seat[ran]
    seatNow.classList.add("seat-target")

    let blink = 0
    let tarNow = targets[targetMadeTotal % 5] // tar1 ~ tar5를 하나씩 거치므로, 타겟 여러개가 동시에 존재해도 문제가 발생하지 않는다.
    targetMadeTotal ++
    tarNow = setInterval(() => {
      blink ++ //클릭 가능 상태인 셀의 색을 주기마다 미세하게 변경해 반짝이는 효과를 준다.
      if (seatNow.classList.contains("seat-success")) {
        clearInterval(tarNow)
        tarNow = null
      } else if (blink >= 5) { //주기 * 5회 만큼의 시간 경과시 타겟 소멸, 실패 판정은 안함. 현재 설정은 0.2초 * 5회= 1초.
        seatNow.classList.remove("seat-target")
        seatNow.classList.remove("seat-target-blink")
        clearInterval(tarNow)
        tarNow = null
        seatNow.classList.add("seat-late")
        seatNow.textContent = 'X'
      } else if (blink % 2 == 1) { 
        seatNow.classList.add("seat-target-blink")
        seatNow.classList.remove("seat-target")
      } else {
        seatNow.classList.add("seat-target")
        seatNow.classList.remove("seat-target-blink")
      }
    }, 200);

  } else {
    randomTarget()
  }
}


function randomTimer() { // 랜덤한 시간 뒤에 셀 중 하나를 target으로 만듦. 지금 설정된 시간은 0.3초 이상 2초 미만.
  let randomTime = Math.floor(Math.random() * 1700) + 300

  setTimeout(() => {
    randomTarget()
    if (CD != null) {
      randomTimer()
    }
  }, randomTime)
}




// 게임 -> 결과

const tNum = document.getElementById("tNum")
const sNum = document.getElementById("sNum")
const mNum = document.getElementById("mNum")

const clear = document.getElementById("clear")
const clearMsg = document.getElementById("clear-msg")
const gameover = document.getElementById("gameover")
const gameoverMsg = document.getElementById("gameover-msg")

function showResult() {
  play.classList.add("is-hidden")
  result.classList.remove("is-hidden")

  if (cleared) {
    clear.classList.remove("is-hidden")
    clearMsg.classList.remove("is-hidden")
  } else {
    gameover.classList.remove("is-hidden")
    gameoverMsg.classList.remove("is-hidden")
    
  }
  if (time === 60) { // 1초가 흐르기 전에 miss를 3번 내서 남은 시간 1분으로 끝날 경우, 00:60으로 표기하지 않도록 하기 위한 코드.
    tNum.textContent = "01:00"
  } else {
    tNum.textContent = "00:" + String(time).padStart(2, "0");
  }
  sNum.textContent = sCount.textContent + "/10"
  mNum.textContent = mCount.textContent
}
