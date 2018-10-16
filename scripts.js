let clear = document.querySelector('.clear');

function clearOutput() {
	document.getElementById("answer").innerHTML = "";
}

clear.addEventListener('click', clearOutput);


validate = function() {                                                     
	let name = document.getElementById("english-input").value;              // taking input & assign to variable 
	let translation = translatePigLatin(name);                              // assign trans func to variable

	document.getElementById("answer").innerHTML = translation;              // call function and assign result to id
	document.getElementById("pigForm").reset();
	window.scrollTo(0,0);

	
}

// translator function
function translatePigLatin(str) {
	let arr = str.split(" ").map(el => {

		const reFindVowel = /\b[aeiouAEIOU]/g;
	const reFindConsonant = /\b[^aeiouAEIOU]+/g;
	return reFindVowel.test(el) ? append(el) : remove(el);

	function append(el) {
		return el.concat("way").toLowerCase();
	}

	function remove(el) {
		let start = el.match(reFindConsonant);
		return el.replace(reFindConsonant, "").concat(start + "ay").toLowerCase();
	}


	});

	

	let newStr = arr.join(" ");
	let cap = newStr.charAt(0).toUpperCase();
	return `${newStr.replace(/^[a-z]/ig, cap)}`
}  