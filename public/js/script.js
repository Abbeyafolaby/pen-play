const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Show modal when button is clicked
openModalBtn.addEventListener('click', () => {
modal.classList.remove('hidden');
modal.classList.add('flex');
});

// Close modal when 'Cancel' button is clicked
closeModalBtn.addEventListener('click', () => {
modal.classList.add('hidden');
modal.classList.remove('flex');
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
if (event.target === modal) {
modal.classList.add('hidden');
modal.classList.remove('flex');
}
});

document.getElementById('searchInput').addEventListener('input', async function() {
    const searchTerm = this.value;
    const response = await fetch(`/?search=${searchTerm}`);
    const html = await response.text();
    document.querySelector('.container').innerHTML = new DOMParser().parseFromString(html, 'text/html').querySelector('.container').innerHTML;
});
