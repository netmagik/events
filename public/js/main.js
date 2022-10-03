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

// Add event Listener
modalButton.addEventListener('click', () => {
	modal.style.display = "block";
})
// Close Modal
submitButton.onclick = function() {
    modal.style.display = "none";
    }
// Close modal 
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}