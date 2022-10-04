const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

// Add Event Listeners
btn.addEventListener("click", () => {
	menu.classList.toggle("hidden");
});

// Modal Functionality
const modalButton = document.querySelector('#openEdit')
const modal = document.querySelector('.modal')
const submitButton = document.querySelector('#submit')

