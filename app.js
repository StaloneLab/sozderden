const CYR_TO_LAT = {"а":"a","ә":"ä","б":"b","д":"d","е":"e","э":"e","ф":"f","г":"g","ғ":"ğ","х":"h","һ":"h","и":"i","й":"i","і":"ı","ё":"io","ю":"iu","я":"ia","ж":"j","к":"k","л":"l","м":"m","н":"n","ң":"ñ","о":"o","ө":"ö","п":"p","қ":"q","р":"r","с":"s","ш":"ş","щ":"şş","т":"t","ц":"ts","ч":"tş","у":"u","ұ":"ū","ү":"ü","в":"v","ы":"y","з":"z","ъ":"","ь":"","А":"A","Ә":"Ä","Б":"B","Д":"D","Е":"E","Э":"E","Ф":"F","Г":"G","Ғ":"Ğ","Х":"H","Һ":"H","И":"İ","Й":"İ","І":"I","Ё":"İo","Ю":"İu","Я":"İa","Ж":"J","К":"K","Л":"L","М":"M","Н":"N","Ң":"Ñ","О":"O","Ө":"Ö","П":"P","Қ":"Q","Р":"R","С":"S","Ш":"Ş","Щ":"Şş","Т":"T","Ц":"Ts","Ч":"Tş","У":"U","Ұ":"Ū","Ү":"Ü","В":"V","Ы":"Y","З":"Z","Ъ":"","Ь":""};
const LAT_TO_CYR = {"a":{"default":"а","cases":[]},"ä":{"default":"ә","cases":[]},"á":{"default":"ә","cases":[]},"b":{"default":"б","cases":[]},"d":{"default":"д","cases":[]},"e":{"default":"е","cases":[]},"f":{"default":"ф","cases":[]},"g":{"default":"г","cases":[]},"ğ":{"default":"ғ","cases":[]},"ǵ":{"default":"ғ","cases":[]},"h":{"default":"х","cases":[]},"i":{"default":"и","cases":[{"nextLetter":"o","replaceWith":"ё"},{"nextLetter":"u","replaceWith":"ю"},{"nextLetter":"a","replaceWith":"я"}]},"ı":{"default":"і","cases":[{"nextLetter":"o","replaceWith":"ё"},{"nextLetter":"u","replaceWith":"ю"},{"nextLetter":"a","replaceWith":"я"}]},"j":{"default":"ж","cases":[]},"k":{"default":"к","cases":[]},"l":{"default":"л","cases":[]},"m":{"default":"м","cases":[]},"n":{"default":"н","cases":[]},"ñ":{"default":"ң","cases":[]},"ń":{"default":"ң","cases":[]},"o":{"default":"о","cases":[]},"ö":{"default":"ө","cases":[]},"ó":{"default":"ө","cases":[]},"p":{"default":"п","cases":[]},"q":{"default":"қ","cases":[]},"r":{"default":"р","cases":[]},"s":{"default":"с","cases":[{"nextLetter":"h","replaceWith":"ш"}]},"ş":{"default":"ш","cases":[{"nextLetter":"ş","replaceWith":"щ"}]},"t":{"default":"т","cases":[{"nextLetter":"s","replaceWith":"ц"},{"nextLetter":"ş","replaceWith":"ч"}]},"ç":{"default":"ч","cases":[]},"u":{"default":"у","cases":[]},"ū":{"default":"ұ","cases":[]},"ü":{"default":"ү","cases":[]},"ú":{"default":"ү","cases":[]},"v":{"default":"в","cases":[]},"y":{"default":"ы","cases":[]},"ý":{"default":"у","cases":[]},"z":{"default":"з","cases":[]},"A":{"default":"А","cases":[]},"Ä":{"default":"Ә","cases":[]},"Á":{"default":"Ә","cases":[]},"B":{"default":"Б","cases":[]},"D":{"default":"Д","cases":[]},"E":{"default":"Е","cases":[]},"F":{"default":"Ф","cases":[]},"G":{"default":"Г","cases":[]},"Ğ":{"default":"Ғ","cases":[]},"Ǵ":{"default":"Ғ","cases":[]},"H":{"default":"Х","cases":[]},"İ":{"default":"И","cases":[{"nextLetter":"o","replaceWith":"Ё"},{"nextLetter":"u","replaceWith":"Ю"},{"nextLetter":"a","replaceWith":"Я"}]},"I":{"default":"І","cases":[{"nextLetter":"o","replaceWith":"Ё"},{"nextLetter":"u","replaceWith":"Ю"},{"nextLetter":"a","replaceWith":"Я"}]},"J":{"default":"Ж","cases":[]},"K":{"default":"К","cases":[]},"L":{"default":"Л","cases":[]},"M":{"default":"М","cases":[]},"N":{"default":"Н","cases":[]},"Ñ":{"default":"Ң","cases":[]},"Ń":{"default":"Ң","cases":[]},"O":{"default":"О","cases":[]},"Ö":{"default":"Ө","cases":[]},"Ó":{"default":"Ө","cases":[]},"P":{"default":"П","cases":[]},"Q":{"default":"Қ","cases":[]},"R":{"default":"Р","cases":[]},"S":{"default":"С","cases":[{"nextLetter":"h","replaceWith":"Ш"}]},"Ş":{"default":"Ш","cases":[{"nextLetter":"ş","replaceWith":"Щ"}]},"T":{"default":"Т","cases":[{"nextLetter":"s","replaceWith":"Ц"},{"nextLetter":"ş","replaceWith":"Ч"}]},"Ç":{"default":"Ч","cases":[]},"U":{"default":"У","cases":[]},"Ū":{"default":"Ұ","cases":[]},"Ü":{"default":"Ү","cases":[]},"Ú":{"default":"Ү","cases":[]},"V":{"default":"В","cases":[]},"Y":{"default":"Ы","cases":[]},"Ý":{"default":"У","cases":[]},"Z":{"default":"З","cases":[]}};

function cyrToLat(text) {
	let convertedText = "";

	for(let l = 0; l < text.length; l++) {
		const letter = text.charAt(l);

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
		const letter = text.charAt(l);
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
