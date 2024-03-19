// javascript

const endorsementInput = document.getElementById("endorsement-input");
const fromInput = document.getElementById("from-input");
const toInput = document.getElementById("to-input");
const publishBtn = document.getElementById("publish-btn");

publishBtn.addEventListener("click", function () {
  console.log(`${fromInput.value} has sent ${toInput.value} a message: "${endorsementInput.value}`);
});
