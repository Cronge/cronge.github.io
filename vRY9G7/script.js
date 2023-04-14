let studentNames = ["Error: No name provided"];
let sortedNames = [];

let fStudentNames;
let fSortedNames;

const inputs = document.getElementsByTagName("input");

const submitButton = document.getElementById("submit-button");
const sortButton = document.getElementById("sort-button");

const separator = document.getElementById("separator");

const output = document.getElementById("output"); 
const sortedOutput = document.getElementById("sorted-output"); 

const namesSeparator = document.getElementById("names-separator");
const sortedNamesDiv = document.getElementById("sorted-names")

Array.from(inputs).forEach((input) => {
	input.addEventListener("change", () => {
		for (let i = 0; i < inputs.length; i++) {
			studentNames[i] = inputs[i].value;
		}
	});
});

const compare = (a, b) => {
	const numA = !isNaN(a);
	const numB = !isNaN(b);
  
	if (numA && numB) {
	  return Number(a) - Number(b);
	}
  
	if (numA) return -1;
	if (numB) return 1;
  
	const wordA = /^[a-zA-Z]+$/.test(a);
	const wordB = /^[a-zA-Z]+$/.test(b);
  
	if (wordA && wordB) {
	  return a.localeCompare(b);
	}
  
	if (wordA) return -1;
	if (wordB) return 1;
  
	return 1; 
};

submitButton.addEventListener("click", () => {
	separator.style.display = "inline";
	sortButton.style.display = "inline";
	fStudentNames = studentNames.join(", ");
	output.innerHTML = `Names — ${fStudentNames}`;
});

sortButton.addEventListener("click", () => {
	for (let i = 0; i < studentNames.length; i++) {
		sortedNames[i] = studentNames[i];
	}

	sortedNames.sort(compare);

	fSortedNames = sortedNames.join(", ");

	namesSeparator.style.display = "block";
	sortedNamesDiv.style.display = "block";

	sortedOutput.innerHTML = `Names (sorted) — ${fSortedNames}`;
});