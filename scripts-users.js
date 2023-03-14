// const api_url = "http://127.0.0.1:3000";
let userCurrentPage = 1;

const userList = document.getElementById("users-table");
const fetchUsers = document.getElementById("user-fetch-btn");
const nextUsers = document.getElementById("next-users");
const prevUsers = document.getElementById("prev-users");

const getUsers = (page) => {
	fetch(`${api_url}/users?page=${page}&limit=5`)
		.then((res) => res.json())
		.then((users) => {
			users.data.users.forEach((user) => {
				const row = document.createElement("tr");
				const idCell = document.createElement("td");
				const nameCell = document.createElement("td");
				const ageCell = document.createElement("td");
				const genderCell = document.createElement("td");

				idCell.innerText = user.id;
				nameCell.innerText = user.firstName + user.lastName;
				ageCell.innerText = user.age;
				genderCell.innerText = user.gender;

				row.appendChild(idCell);
				row.appendChild(nameCell);
				row.appendChild(ageCell);
				row.appendChild(genderCell);

				userList.appendChild(row);

				prevUsers.disabled = users.data.previous === undefined ? true : false;
				nextUsers.disabled = users.data.next === undefined ? true : false;
				return users.data.next;
			});
		})
		.catch((err) => {
			console.error(err);
		});
};

fetchUsers.addEventListener("click", () => {
	getUsers(userCurrentPage);
});

prevUsers.addEventListener("click", () => {
	while (userList.hasChildNodes()) {
		userList.removeChild(userList.firstChild);
	}
	userCurrentPage--;
	getUsers(userCurrentPage);
});

nextUsers.addEventListener("click", () => {
	while (userList.hasChildNodes()) {
		userList.removeChild(userList.firstChild);
	}
	userCurrentPage++;
	getUsers(userCurrentPage);
});
