// Attach event listeners to buttons
var allButtons = document.getElementsByTagName('button');


for (var i = 0; i < allButtons.length; i++) {
	// TODO: add these functions
	if (allButtons[i].id == "done" || allButtons[i].id == "question") {
		allButtons[i].addEventListener("click", null, false);
	}
 
	else {
		allButtons[i].addEventListener("click", toggleTrigger, false);
	}
};


// Reflect colours
function showActiveTriggers() {

	chrome.storage.local.get(['activeFilterTypes'], function (arrayOfFilterTypes) {
		
		console.log(arrayOfFilterTypes);

		// Check if any preferences exist
		if (typeof arrayOfFilterTypes.profile === "undefined" && arrayOfFilterTypes.length == 0) {
			console.log("new arr");
			chrome.storage.local.set({'activeFilterTypes': []});
		}

		else {
			// Change colours
			console.log("exist arr");

			(arrayOfFilterTypes.activeFilterTypes).forEach(function(item) {
				var button = document.getElementById(item);
				button.className = "mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-color--red-A100";
			});
		}
	});
}

// Add new trigger
function toggleTrigger(){

	window.trigger = this.id;

	chrome.storage.local.get(['activeFilterTypes'], function (arrayOfFilterTypes) {

		allPermissions = (arrayOfFilterTypes.activeFilterTypes).slice(0);

		updateChromePermissions(allPermissions);
	});

	function updateChromePermissions(perms) {

		// Add to local storage
		if (perms.indexOf(trigger) > -1) {
			perms.splice(perms.indexOf(trigger, 1));
			document.getElementById(trigger).className = "mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-color--light-blue-A100";
		}

		else {
			perms.push(trigger);
		}

		chrome.storage.local.set({'activeFilterTypes': perms});
		showActiveTriggers();
	}


}

showActiveTriggers();