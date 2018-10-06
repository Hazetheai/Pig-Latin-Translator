function translatePigLatin(str) {
	const reFindVowel = /\b[aeiouAEIOU]/g;
	const reFindConsonant = /\b[^aeiouAEIOU]+/g;
	return reFindVowel.test(str) ? append(str) : remove(str);

	function append(str) {
		return str.concat("way");
	}

	function remove(str) {
		let start = str.match(reFindConsonant);
		return str.replace(reFindConsonant, "").concat(start + "ay");
	}
}

translatePigLatin("eight");