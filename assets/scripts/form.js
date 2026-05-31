const questions = [
  {
    text: "수도권(서울/경기)에 살거나 자주 방문하나요?",
    yes: { lg: 2 },
    no: { lotte: 1, kia: 1, samsung: 1 },
  },
  {
    text: "나는 차분한 투수전보다 시원한 타자전을 더 좋아할 것 같다.",
    yes: { lotte: 2, kia: 1 },
    no: { samsung: 2, lg: 1 },
  },
  {
    text: "응원할 팀은 성적이 무조건 좋아야 한다고 생각한다.",
    yes: { kia: 2, samsung: 1 },
    no: { lotte: 2, lg: 1 },
  },
  {
    text: "야구장은 경기보다 응원 분위기를 즐기러 가는 비중이 크다.",
    yes: { lotte: 2, kia: 1 },
    no: { lg: 1, samsung: 1 },
  },
  {
    text: "유니폼은 밝고 화려한 색이 더 좋은가요?",
    yes: { kia: 2, lotte: 1 },
    no: { lg: 1, samsung: 2 },
  },
  {
    text: "나는 오래된 역사와 전통이 있는 팀에 더 끌린다.",
    yes: { samsung: 2, lotte: 1 },
    no: { lg: 1, kia: 1 },
  },
  {
    text: "처음 보는 팀이라도 응원가가 좋으면 금방 정이 갈 것 같다.",
    yes: { lotte: 2, kia: 1 },
    no: { lg: 1, samsung: 1 },
  },
  {
    text: "팬덤이 뜨겁고 목소리 큰 팀이 더 매력적이다.",
    yes: { lotte: 2, kia: 2 },
    no: { lg: 1, samsung: 1 },
  },
  {
    text: "처음 입문할 때는 주변에 팬이 많고 정보가 많은 팀이 좋다.",
    yes: { lg: 2, kia: 1 },
    no: { samsung: 1, lotte: 1 },
  },
  {
    text: "팀 굿즈와 응원 아이템을 많이 구매할 것 같나요?",
    yes: { lg: 1, kia: 1, lotte: 2 },
    no: { samsung: 2 },
  },
];

const teams = {
  lg: {
    name: "LG 트윈스",
    title: "LG 트윈스가\n당신의 팀!",
    type: "\"세련된 도시형 팬\"",
    color: "#C30452",
    darkColor: "#98003d",
    emblem: "../assets/emblem/lg_emblem.svg",
    basePercent: 91,
    maxScore: 10,
    description:
      "수도권 라이프와 SNS 인증을 즐기는 당신은 LG 트윈스의 핫한 응원 문화와 찰떡! 잠실의 화려한 응원 열기 속에서 가장 빛날 타입입니다.",
  },
  samsung: {
    name: "삼성 라이온즈",
    title: "삼성 라이온즈가\n당신의 팀!",
    type: "\"정통파 응원러\"",
    color: "#074CA1",
    darkColor: "#003566",
    emblem: "../assets/emblem/samsung_emblem.svg",
    basePercent: 87,
    maxScore: 12,
    description:
      "안정감과 정통성을 중시하는 당신은 삼성 라이온즈의 클래식한 응원 문화에 잘 맞아요. 라이온즈파크의 분위기를 사랑할 거예요.",
  },
  lotte: {
    name: "롯데 자이언츠",
    title: "롯데 자이언츠가\n당신의 팀!",
    type: "\"역전의 한 방을 사랑하는\"",
    color: "#D62828",
    darkColor: "#9d1c1c",
    emblem: "../assets/emblem/lotte_emblem.svg",
    basePercent: 84,
    maxScore: 15,
    description:
      "분위기와 열정, 끝까지 포기 않는 응원을 사랑하는 당신은 롯데 자이언츠의 뜨거운 팬덤과 완벽 매치! 사직야구장 한 번이면 빠져나올 수 없어요.",
  },
  kia: {
    name: "KIA 타이거즈",
    title: "KIA 타이거즈가\n당신의 팀!",
    type: "\"화끈한 우승 청부사\"",
    color: "#EA0029",
    darkColor: "#a9003d",
    emblem: "../assets/emblem/kia_emblem.svg",
    basePercent: 88,
    maxScore: 12,
    description:
      "화려한 컬러와 끈끈한 팬덤, 우승의 기쁨을 함께 나누고 싶은 당신은 KIA 타이거즈와 운명! 광주를 핫하게 달구는 한 명이 될 거예요.",
  },
};

const state = {
  currentIndex: 0,
  answers: Array(questions.length).fill(null),
  resultTeam: null,
  resultPercent: 0,
};

const quizSection = document.querySelector(".quiz-section");
const resultSection = document.querySelector("#resultSection");
const currentNumber = document.querySelector("#currentNumber");
const progressFill = document.querySelector("#progressFill");
const progressCaption = document.querySelector("#progressCaption");
const stepDots = document.querySelector("#stepDots");
const questionCount = document.querySelector("#questionCount");
const questionText = document.querySelector("#questionText");
const answerButtons = document.querySelectorAll(".answer-button");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const resultCard = document.querySelector("#resultCard");
const resultEmblem = document.querySelector("#resultEmblem");
const resultTitle = document.querySelector("#resultTitle");
const resultType = document.querySelector("#resultType");
const matchPercent = document.querySelector("#matchPercent");
const resultDescription = document.querySelector("#resultDescription");
const shareButton = document.querySelector("#shareButton");
const restartButton = document.querySelector("#restartButton");

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function renderQuestion() {
  const questionNumber = state.currentIndex + 1;
  const selectedAnswer = state.answers[state.currentIndex];

  currentNumber.textContent = questionNumber;
  progressFill.style.width = `${(questionNumber / questions.length) * 100}%`;
  progressCaption.textContent = `${questionNumber}번째 질문에 답해 주세요`;
  questionCount.textContent = `QUESTION ${padNumber(questionNumber)} / ${questions.length}`;
  questionText.textContent = questions[state.currentIndex].text;

  answerButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.answer === selectedAnswer);
  });

  stepDots.innerHTML = questions
    .map((_, index) => `<span class="${index === state.currentIndex ? "is-active" : ""}"></span>`)
    .join("");

  prevButton.disabled = state.currentIndex === 0;
  nextButton.textContent = state.currentIndex === questions.length - 1 ? "결과 확인 →" : "다음 →";
}

function selectAnswer(answer) {
  state.answers[state.currentIndex] = answer;
  renderQuestion();
}

function getScores() {
  const scores = {
    lg: 0,
    samsung: 0,
    lotte: 0,
    kia: 0,
  };

  state.answers.forEach((answer, index) => {
    const scoreMap = questions[index][answer] || {};

    Object.entries(scoreMap).forEach(([team, score]) => {
      scores[team] += score;
    });
  });

  return scores;
}

function resolveTie(tiedTeams, firstAnswer) {
  if (firstAnswer === "yes" && tiedTeams.includes("lg")) {
    return "lg";
  }

  if (firstAnswer === "no") {
    return ["lotte", "kia", "samsung", "lg"].find((team) => tiedTeams.includes(team));
  }

  return tiedTeams[0];
}

function getResultTeam(scores) {
  const maxScore = Math.max(...Object.values(scores));
  const tiedTeams = Object.keys(scores).filter((team) => scores[team] === maxScore);

  if (tiedTeams.length === 1) {
    return tiedTeams[0];
  }

  return resolveTie(tiedTeams, state.answers[0]);
}

function getMatchPercent(team, score) {
  const teamData = teams[team];
  const rawPercent = Math.round((score / teamData.maxScore) * 100);
  const blendedPercent = Math.round(teamData.basePercent * 0.7 + rawPercent * 0.3);

  return Math.min(99, Math.max(75, blendedPercent));
}

function showResult() {
  const scores = getScores();
  const team = getResultTeam(scores);
  const teamData = teams[team];
  const percent = getMatchPercent(team, scores[team]);

  state.resultTeam = team;
  state.resultPercent = percent;

  resultCard.dataset.team = team;
  resultCard.style.setProperty("--team-color", teamData.color);
  resultCard.style.setProperty("--team-color-dark", teamData.darkColor);
  resultEmblem.src = teamData.emblem;
  resultEmblem.alt = `${teamData.name} 엠블럼`;
  resultTitle.textContent = teamData.title;
  resultType.textContent = teamData.type;
  matchPercent.textContent = `${percent}%`;
  resultDescription.textContent = teamData.description;

  quizSection.classList.add("is-hidden");
  resultSection.classList.remove("is-hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goNext() {
  if (!state.answers[state.currentIndex]) {
    showToast("O 또는 X를 먼저 선택해 주세요.");
    return;
  }

  if (state.currentIndex === questions.length - 1) {
    showResult();
    return;
  }

  state.currentIndex += 1;
  renderQuestion();
}

function goPrev() {
  if (state.currentIndex === 0) {
    return;
  }

  state.currentIndex -= 1;
  renderQuestion();
}

function restartTest() {
  state.currentIndex = 0;
  state.answers = Array(questions.length).fill(null);
  state.resultTeam = null;
  state.resultPercent = 0;

  resultSection.classList.add("is-hidden");
  quizSection.classList.remove("is-hidden");
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function shareResult() {
  const team = teams[state.resultTeam];
  const shareText = `내 KBO 운명의 팀은 ${team.name}! 매치율 ${state.resultPercent}%`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "KBO First 운명의 팀 결과",
        text: shareText,
        url: window.location.href,
      });
      return;
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
    }
  }

  try {
    await navigator.clipboard.writeText(shareText);
    showToast("결과가 클립보드에 복사됐어요.");
  } catch {
    showToast(shareText);
  }
}

function showToast(message) {
  const oldToast = document.querySelector(".toast");

  if (oldToast) {
    oldToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 2200);
}

answerButtons.forEach((button) => {
  button.addEventListener("click", () => selectAnswer(button.dataset.answer));
});

nextButton.addEventListener("click", goNext);
prevButton.addEventListener("click", goPrev);
restartButton.addEventListener("click", restartTest);
shareButton.addEventListener("click", shareResult);

renderQuestion();
