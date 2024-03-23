import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://new-we-are-the-champions-db-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const endorsementInput = document.getElementById("endorsement-input");
const fromInput = document.getElementById("from-input");
const toInput = document.getElementById("to-input");
const publishBtn = document.getElementById("publish-btn");
const endorsementSection = document.getElementById("endorsements-container");

publishBtn.addEventListener("click", function () {
  console.log(
    `${fromInput.value} has sent ${toInput.value} a message: "${endorsementInput.value}"`
  );

  if (!endorsementInput.value || !fromInput.value || !toInput.value) {
    alert("Please fill out all fields");
    return;
  }

  createEndorsement(endorsementInput.value, fromInput.value, toInput.value);
  appendEndorsementToDB(endorsementInput.value, fromInput.value, toInput.value);
  clearInputs();
});

function clearInputs() {
  endorsementInput.value = "";
  fromInput.value = "";
  toInput.value = "";
}

function appendEndorsementToDB(endorsement, from, to) {
  push(endorsementsInDB, {
    endorsement: endorsement,
    from: from,
    to: to,
  });
}

function createEndorsement(endorsement, from, to) {
  const endorsementElement = document.createElement("div");
  endorsementElement.className = "endorsement-div";
  endorsementElement.innerHTML = `
  <p class="to">To ${to}</p>
  <p class="endorsement">${endorsement}</p>
  <p class="from">From ${from}</p>`;
  endorsementSection.append(endorsementElement);
}

onValue(endorsementsInDB, function (snapshot) {
  if (snapshot.exists()) {
    const endorsementsArray = Object.entries(snapshot.val());
    endorsementSection.innerHTML = "";

    for (let i = 0; i < endorsementsArray.length; i++) {
      const currentItem = endorsementsArray[i];
      const endorsementValue = currentItem[1].endorsement;
      const fromValue = currentItem[1].from;
      const toValue = currentItem[1].to;
      createEndorsement(endorsementValue, fromValue, toValue);
    }
    console.log(endorsementsArray.length);
  } else {
    console.log("No data available");
  }
});
