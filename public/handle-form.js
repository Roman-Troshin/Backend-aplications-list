const myForm = document.querySelector("form");
const button = myForm.querySelector("button");
const inputs = myForm.querySelectorAll(".form-control");

button.addEventListener("click", async () => {
	button.disabled = true;

	const formData = new FormData(myForm);
	const username = formData.get("username");
	const phonenumber = formData.get("phonenumber");
	const message = formData.get("message");

	await add(username, phonenumber, message).then(() => {
		inputs.forEach((input) => (input.value = ""));
		button.disabled = false;
	});
});

async function add(username, phonenumber, message) {
	await fetch("/application", {
		method: "POST",
		body: JSON.stringify({ username, phonenumber, message }),
		headers: {
			"Content-Type": "application/json",
		},
	});
}
