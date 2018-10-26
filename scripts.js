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
	// document.forms["pigForm"].reset();
	window.scrollTo(0,0);
	getMsg();
	speak();
};

myForm.addEventListener('submit', submit);

//Clear function
function clearOutput() {
	document.getElementById("answer").innerHTML = "";
}

clear.addEventListener('click', clearOutput);

//Speak function

function speak() {
	toggle();
}

	
// Speech to text

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


	// Text to Speech

	 //set variables
	 const msg = new SpeechSynthesisUtterance();
	 let voices = [];
	 const voicesDropdown = document.querySelector('[name="voice"]');
	 const options = document.querySelectorAll('[type="range"], [name="text"]');
	 const speakButton = document.querySelector('#speak');
	 const stopButton = document.querySelector('#stop');
   
   
	 //the text we are speaking
	 function getMsg() {
		msg.text = document.querySelector('#answer').textContent;
	 	console.log(msg.text);
	 }

	 
   
   
	 //put voices from Chromes APi into list
	 function populateVoices() {
		 voices = this.getVoices();
		 voicesDropdown.innerHTML  = voices
		 .filter(voice => voice.lang.includes('en'))
		   .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
		   .join('');
	 }
   
   
	 //set the voice
	 function setVoice() {
		 msg.voice = voices.find(voice => voice.name === this.value);
		 console.log(msg);
   
	}
	 //restart phrase if interrupted
	  function toggle(startOver = true) {
	   speechSynthesis.cancel();
	   if (startOver) {
		 speechSynthesis.speak(msg);
	   }
	 }
	 // choose options
	 function setOption() {
		 console.log(this.name, this.value);
		 msg[this.name] = this.value;
		 toggle();
	 }
   
	 speechSynthesis.addEventListener('voiceschanged', populateVoices);
	 voicesDropdown.addEventListener('change', setVoice);
   
   options.forEach(option => option.addEventListener('change', setOption));
   
   speakButton.addEventListener('click', toggle);
   stopButton.addEventListener('click', () => toggle(false));
	


	

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