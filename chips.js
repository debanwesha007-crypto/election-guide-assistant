// =============================================
//  Election Guide Assistant — Quick Chips
// =============================================

const CHIP_SETS = {
  general: [
    { label: "How does an election work?",    question: "How does the election process work from start to finish?" },
    { label: "Electoral systems",             question: "What are the different types of electoral systems used around the world?" },
    { label: "Who runs elections?",           question: "Who is responsible for administering and overseeing elections?" },
    { label: "What happens on election day?", question: "What happens on election day from polls opening to closing?" },
  ],
  voter: [
    { label: "How to register",              question: "How do I register to vote and what documents do I need?" },
    { label: "Registration deadlines",       question: "When is the deadline to register to vote?" },
    { label: "Absentee voting",              question: "How does absentee or mail-in voting work?" },
    { label: "Early voting options",         question: "What are my early voting options?" },
  ],
  candidate: [
    { label: "How to file",                  question: "How does a candidate officially file to run for office?" },
    { label: "Ballot access",                question: "How do candidates get their name on the ballot?" },
    { label: "Campaign finance rules",       question: "What are the rules around campaign financing and donations?" },
    { label: "Primary vs. general",          question: "What is the difference between a primary election and a general election?" },
  ],
  timeline: [
    { label: "Full election timeline",       question: "Walk me through a complete election timeline from filing to certification." },
    { label: "When do primaries happen?",    question: "When do primary elections typically take place?" },
    { label: "Certification process",        question: "How long does it take to certify election results after voting day?" },
    { label: "Election to inauguration",     question: "What happens between election day and inauguration?" },
  ],
  results: [
    { label: "How votes are counted",        question: "How are votes counted and who oversees the process?" },
    { label: "Official certification",       question: "How are election results officially certified?" },
    { label: "Recount rules",                question: "When can a candidate request a recount?" },
    { label: "Electoral college",            question: "How does the electoral college system work?" },
  ],
};

function renderChips(ctxKey, onSelect) {
  const container = document.getElementById("quick-chips");
  container.innerHTML = "";
  container.style.display = "flex";

  const chips = CHIP_SETS[ctxKey] || CHIP_SETS.general;
  chips.forEach(({ label, question }) => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.textContent = label;
    btn.addEventListener("click", () => onSelect(question));
    container.appendChild(btn);
  });
}
