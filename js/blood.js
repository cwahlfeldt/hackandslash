document.addEventListener('DOMContentLoaded', function () {
    const logoContainer = document.querySelector('.logo-container');
    const logoText = document.querySelector('.logo');

    // Create blood droplets container
    const bloodContainer = document.createElement('div');
    bloodContainer.className = 'blood-container';
    logoContainer.appendChild(bloodContainer);

    // Create fixed number of blood droplets
    function createBloodDroplets() {
        // Clear existing droplets
        bloodContainer.innerHTML = '';

        // Number of blood droplets
        const dropletCount = 15;

        for (let i = 0; i < dropletCount; i++) {
            const droplet = document.createElement('div');
            droplet.className = 'blood-droplet';

            // Random horizontal position under the logo
            const randomX = Math.random() * logoContainer.offsetWidth;

            // Set initial position and properties
            droplet.style.left = `${randomX}px`;
            droplet.style.animationDelay = `${Math.random() * 5}s`;
            droplet.style.animationDuration = `${3 + Math.random() * 4}s`;

            bloodContainer.appendChild(droplet);
        }
    }

    // Add blood overlay to the logo instead of manipulating the text content
    function addBloodOverlay() {
        // Create a blood overlay div
        const bloodOverlay = document.createElement('div');
        bloodOverlay.className = 'blood-overlay';
        logoContainer.appendChild(bloodOverlay);
    }

    // Initialize animation
    createBloodDroplets();
    addBloodOverlay();

    // Refresh droplets occasionally to prevent stale animations
    setInterval(function () {
        createBloodDroplets();
    }, 15000); // Refresh every 15 seconds
});