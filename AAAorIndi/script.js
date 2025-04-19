const questions = [
  {
    question: "What do you focus on more when working on a project?",
    A: "Technical complexity",
    B: "Depth of conceptual expression"
  },
  {
    question: "Which working style do you prefer?",
    A: "Following clear guidelines and objectives",
    B: "Free exploration and improvisation"
  },
  {
    question: "How do you usually approach problems?",
    A: "Quickly find feasible solutions",
    B: "Analyze the root of the issue deeply"
  },
  {
    question: "What do you value more in your work?",
    A: "Functionality and user experience",
    B: "Aesthetics and emotional expression"
  },
  {
    question: "What do you prioritize when using technology?",
    A: "Efficiency and practicality",
    B: "Innovation and expressiveness"
  },
  {
    question: "What role do you prefer in team projects?",
    A: "Structure design and logic implementation",
    B: "Creative conception and visual presentation"
  },
  {
    question: "A successful work should:",
    A: "Solve real-world problems",
    B: "Inspire reflection in the audience"
  },
  {
    question: "How do you usually begin your creative process?",
    A: "With a clear execution plan",
    B: "By collecting inspiration and iterating"
  },
  {
    question: "What is the main value of a project in your view?",
    A: "Its practical use and application prospects",
    B: "Its underlying concepts and narratives"
  },
  {
    question: "What kind of workflow do you prefer?",
    A: "Structured and sequential",
    B: "Flexible and experimental"
  },
  {
    question: "You’d rather be a:",
    A: "System architect",
    B: "Artist"
  },
  {
    question: "If you had to choose, you'd prioritize:",
    A: "Technology",
    B: "Concepts"
  }
];

let index = 0;
let scores = [];

function renderScale() {
  const scaleContainer = document.getElementById("scale-options");
  scaleContainer.innerHTML = "";
  for (let i = 1; i <= 7; i++) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "scale";
    input.value = i;
    const circle = document.createElement("span");
    circle.className = "circle";
    label.appendChild(input);
    label.appendChild(circle);
    scaleContainer.appendChild(label);
  }
}

function showQuestion() {
  const q = questions[index];
  document.getElementById("question-text").innerText = q.question;
  document.getElementById("label-left").innerText = q.A;
  document.getElementById("label-right").innerText = q.B;
  renderScale();
}

function nextQuestion() {
  const selected = document.querySelector("input[name='scale']:checked");
  if (!selected) {
    alert("Please select an option");
    return;
  }
  scores.push(Number(selected.value));
  index++;
  if (index < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.querySelector(".question").style.display = "none";
  document.getElementById("scale-options").style.display = "none";
  document.querySelector("button").style.display = "none";
  document.querySelector(".answer-labels").style.display = "none";

  const sum = scores.reduce((a, b) => a + b, 0);
  const avg = sum / scores.length;
  let result = "";
  if (avg < 4) {
    result = "You lean towards being a technical creator, skilled in structure and implementation.";
  } else if (avg > 4) {
    result = "You lean towards being a conceptual creator, focused on ideas and expression.";
  } else {
    result = "You balance both technical and conceptual skills — a versatile creator!";
  }
  document.getElementById("result").innerText = result;
}

showQuestion();