const CYR_TO_LAT = {"а":"a","ә":"ä","б":"b","д":"d","е":"e","э":"e","ф":"f","г":"g","ғ":"ğ","х":"h","һ":"h","и":"i","ё":"io","ю":"iu","я":"ia","й":"i","і":"ı","ж":"j","к":"k","л":"l","м":"m","н":"n","ң":"ñ","о":"o","ө":"ö","п":"p","қ":"q","р":"r","с":"s","ш":"ş","щ":"şş","т":"t","ц":"ts","ч":"tş","у":"u","ұ":"ū","ү":"ü","в":"v","ы":"y","з":"z","ъ":"","ь":""};
const LAT_TO_CYR = {"a":{"default":"а","cases":[]},"ä":{"default":"ә","cases":[]},"á":{"default":"ә","cases":[]},"b":{"default":"б","cases":[]},"d":{"default":"д","cases":[]},"e":{"default":"е","cases":[]},"f":{"default":"ф","cases":[]},"g":{"default":"г","cases":[]},"ğ":{"default":"ғ","cases":[]},"ǵ":{"default":"ғ","cases":[]},"h":{"default":"х","cases":[]},"i":{"default":"и","cases":[{"nextLetter":"o","replaceWith":"ё"},{"nextLetter":"u","replaceWith":"ю"},{"nextLetter":"a","replaceWith":"я"}]},"ı":{"default":"і","cases":[]},"j":{"default":"ж","cases":[]},"k":{"default":"к","cases":[]},"l":{"default":"л","cases":[]},"m":{"default":"м","cases":[]},"n":{"default":"н","cases":[]},"ñ":{"default":"ң","cases":[]},"ń":{"default":"ң","cases":[]},"o":{"default":"о","cases":[]},"ö":{"default":"ө","cases":[]},"ó":{"default":"ө","cases":[]},"p":{"default":"п","cases":[]},"q":{"default":"қ","cases":[]},"r":{"default":"р","cases":[]},"s":{"default":"с","cases":[{"nextLetter":"h","replaceWith":"ш"}]},"ş":{"default":"ш","cases":[{"nextLetter":"ş","replaceWith":"щ"}]},"t":{"default":"т","cases":[{"nextLetter":"s","replaceWith":"ц"},{"nextLetter":"ş","replaceWith":"ч"}]},"u":{"default":"у","cases":[]},"ū":{"default":"ұ","cases":[]},"ü":{"default":"ү","cases":[]},"ú":{"default":"ү","cases":[]},"v":{"default":"в","cases":[]},"y":{"default":"ы","cases":[]},"ý":{"default":"у","cases":[]},"z":{"default":"з","cases":[]}};

function cyrToLat(text) {
	let convertedText = "";

	for(let l = 0; l < text.length; l++) {
		const rawLetter = text.charAt(l);
		// TODO: fix uppercase, knowing that Node doesn't seem to
		// support kk-Latn as a locale
		const letter = rawLetter.toLocaleLowerCase("kk");

		if(!(letter in CYR_TO_LAT)) {
			convertedText += letter;
			continue;
		}

		convertedText += CYR_TO_LAT[letter];
	}

	return convertedText;
}

function latToCyr(text) {
	let convertedText = "";

	for(let l = 0; l < text.length; l++) {
		const rawLetter = text.charAt(l);
		const letter = rawLetter.toLocaleLowerCase("kk");

		if(!(letter in LAT_TO_CYR)) {
			convertedText += letter;
			continue;
		}
		const possibleSubstitutions = LAT_TO_CYR[letter];

		if(l + 1 === text.length) {
			convertedText += possibleSubstitutions.default;
			continue;
		}

		const nextLetter = text.charAt(l + 1);
		let useDefault = true;

		for(let c = 0; c < possibleSubstitutions.cases.length; c++) {
			const {nextLetter: potentialNext, replaceWith} = possibleSubstitutions.cases[c];

			if(potentialNext === nextLetter) {
				convertedText += replaceWith;
				l++;
				useDefault = false;
			}
		}

		if(useDefault) convertedText += possibleSubstitutions.default;
	}

	return convertedText;
}

const cyr_textbox = document.querySelector(".cyr-textbox");
const lat_textbox = document.querySelector(".lat-textbox");

cyr_textbox.addEventListener("keyup", e => {
	lat_textbox.value = cyrToLat(cyr_textbox.value);
});

lat_textbox.addEventListener("keyup", e => {
	cyr_textbox.value = latToCyr(lat_textbox.value);
});
