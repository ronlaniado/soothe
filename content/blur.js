var SOOTHE_ELEMS = [];

function addBlur(elem) {

	if(elem.soothe) {
		return;
	} else {
		elem.soothe = {};
	}

	var targetDiv = elem;

	if (targetDiv.tagName == "B" || targetDiv.tagName == "I" ) {

		targetDiv = targetDiv.parentNode;

	}
		var sentimood = new Sentimood();
		var analysis = sentimood.analyze(targetDiv.textContent);
		// console.log(analysis);

		if (analysis.score < 0) {

			targetDiv.style.webkitFilter =  "blur(3px)";
			targetDiv.addEventListener("click", removeBlur, false);

			// var clearDiv = document.createElement("div");
			// var padding = 2 * parseFloat((window.getComputedStyle(targetDiv, null).getPropertyValue('padding')));

			// clearDiv.style.width = (targetDiv.offsetWidth - padding) + "px";
			// clearDiv.style.height = (targetDiv.offsetHeight - padding) + "px";

			// clearDiv.style.background = "white";
			// clearDiv.style.position = "absolute";
			// clearDiv.style.zIndex = 2;
			// clearDiv.webkitFilter = "blur(2px)";

			// clearDiv.addEventListener("click", removeBlur, false);
			// clearDiv.soothe = {parent : elem};

			// // create span for bluring
			// var newSpan = document.createElement('span');

			// // Append "Lorem Ipsum" text to new span:
			// newSpan.appendChild( document.createTextNode(targetDiv.innerText) );
			// newSpan.soothe = {parent : elem};


			// // Replace old text node with new span:

			// targetDiv.insertBefore(clearDiv, targetDiv.firstChild);

			elem.soothe.div = targetDiv;
			SOOTHE_ELEMS.push(targetDiv);
		}
}


function removeBlur(){
	// Find index of offensive div
	var pos = SOOTHE_ELEMS.indexOf(this.parentNode);
	SOOTHE_ELEMS.splice(pos, 1);

	this.style.webkitFilter =  "blur(0px)";
	this.soothe = null;
}
