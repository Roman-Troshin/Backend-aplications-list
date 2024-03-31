const myTable = document.querySelector("#table");

myTable.addEventListener("click", (evt) => {
	if (evt.target.closest("TR").id) {
		const id = evt.target.closest("TR").id;
		const isDeleteRequired = confirm("Выдействительно хотите удалить заявку?");

		if (isDeleteRequired) {
			remove(id).then(() => {
				evt.target.closest("li").remove();
			});

			evt.target.closest("TR").remove();
		}
	}
});

async function remove(id) {
	await fetch(`/${id}`, { method: "DELETE" });
}
