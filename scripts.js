let clear = document.querySelector('.clear');

function clearOutput() {
	document.getElementById("answer").innerHTML = "";
}

clear.addEventListener('click', clearOutput);

	const myForm = document.forms['pigForm'];
	const output = document.querySelector('#answer');

	myForm.addEventListener('submit', function(e) {
		e.preventDefault();

		const name = myForm.querySelector('input[type="text"]').value;
		if (name == "") return false;
		
		const translation = translatePigLatin(name);
		output.textContent = translation;
		
		document.forms["pigForm"].reset();
		window.scrollTo(0,0);
	});

// translator function
function translatePigLatin(str) {
	const reFindVowel = 	/\b[aeiouAEIOU]/g;
	const reFindConsonant = /\b[^aeiouAEIOU]+/g;

	const append = (el => el.concat("way")
	.toLowerCase());

	const remove = (el => el.replace(reFindConsonant, "")
	.concat(el.match(reFindConsonant) + "ay")
	.toLowerCase());

	const arr = str.split(" ").map(el => reFindVowel.test(el) ? append(el) 
															  : remove(el));

	let newStr = arr.join(" ");
	let cap = newStr.charAt(0).toUpperCase();
	return `${newStr.replace(/^[a-z]/ig, cap)}`
}  