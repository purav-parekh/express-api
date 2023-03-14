// import API_URL from "./constants";
const API_URL = "http://127.0.0.1:3000";
let currentPage = 1;

const productList = document.getElementById("products-table");
const fetchButton = document.getElementById("fetch-products");
const prevBtn = document.getElementById("prev-products");
const nextBtn = document.getElementById("next-products");
const prodIdBtn = document.getElementById("prod-id-btn");
let id = document.getElementById("post-prod-id");
const form = document.getElementById("post-form");
const formBtn = document.getElementById("post-data");
const name = document.getElementById("name").value;
const price = document.getElementById("price").value;

// GET PRODUCTS request example
const getProds = (page) => {
	while (productList.hasChildNodes()) {
		productList.removeChild(productList.firstChild);
	}
	fetch(`${API_URL}/products?page=${page}&limit=5`)
		.then((response) => response.json())
		.then((products) => {
			products.data.prods.forEach((product) => {
				const row = document.createElement("tr");
				const idCell = document.createElement("td");
				const nameCell = document.createElement("td");
				const priceCell = document.createElement("td");

				idCell.innerText = product.id;
				nameCell.innerText = product.title;
				priceCell.innerText = product.price;

				idCell.style = "border: 1px solid black";
				nameCell.style = "border: 1px solid black";
				priceCell.style = "border: 1px solid black";

				row.appendChild(idCell);
				row.appendChild(nameCell);
				row.appendChild(priceCell);

				productList.appendChild(row);

				prevBtn.disabled = products.data.previous === undefined ? true : false;
				nextBtn.disabled = products.data.next === undefined ? true : false;
				return products.data.next;
			});
		})
		.catch((error) => {
			console.error(error);
		});
};

fetchButton.addEventListener("click", () => {
	getProds(currentPage);
});

prevBtn.addEventListener("click", () => {
	while (productList.hasChildNodes()) {
		productList.removeChild(productList.firstChild);
	}
	currentPage--;
	getProds(currentPage);
});

nextBtn.addEventListener("click", () => {
	while (productList.hasChildNodes()) {
		productList.removeChild(productList.firstChild);
	}
	currentPage++;
	getProds(currentPage);
});

const getProdByID = () => {
	fetch(`${API_URL}/products/${id.value}`)
		.then((response) => response.json())
		.then((products) => {
			const row = document.getElementById("data");
			row.innerText = `${products.data.title} = ${products.data.id}`;
		})
		.catch((error) => {
			console.error(error);
		});
};

prodIdBtn.addEventListener("click", (e) => {
	e.preventDefault();
	if (id.value) getProdByID();
	id.value = "";
});

formBtn.addEventListener("click", (event) => {
	event.preventDefault();
	if (name && price) postProds();
	form.reset();
});

// POST request example

const postProds = () => {
	console.log(name, price);
	fetch(`${API_URL}/products`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name,
			price,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			getProds(1);
		});
};
/*
// PUT request example
fetch(`${api_url}/1`, {
	method: "PUT",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ name: "updated item 1", description: "updated item description" }),
})
	.then((response) => response.json())
	.then((data) => {
		// handle response data
	})
	.catch((error) => {
		// handle error
	});

// DELETE request example
fetch(`${api_url}/1`, {
	method: "DELETE",
})
	.then((response) => {
		// handle response data
	})
	.catch((error) => {
		// handle error
	});
*/

const deleteProds = () => {
	fetch(`${API_URL}/products/${id.value}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name,
			price,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			getProds(1);
		});
};
