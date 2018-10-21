let clear = document.querySelector('.clear');
const myForm = document.forms['pigForm'];
const output = document.querySelector('#answer');

// Submit function
function submit(e) {
	e.preventDefault();
	let name = myForm.querySelector('input[type="text"]').value;
	if (name == "") return false;	
	const translation = translatePigLatin(name);
	output.textContent = translation;	
	document.forms["pigForm"].reset();
	window.scrollTo(0,0);
};

myForm.addEventListener('submit', submit);

//Clear function
function clearOutput() {
	document.getElementById("answer").innerHTML = "";
}

clear.addEventListener('click', clearOutput);

	
// Text to speech

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
	recognition.interimResults = true;
	
	// let p = document.createElement('p');
	// p.classList.add('speech');
    // const words = document.querySelector('.input');
	// words.append(p);
	
	recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            // p.textContent = transcript;
            if(e.results[0].isFinal) {
                myForm.querySelector('input[type="text"]').value = transcript;
            }
			console.log(transcript);
    });
	recognition.addEventListener('end', recognition.start);
	recognition.addEventListener('end', submit);
	
    
	recognition.start();
	


	

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