document.addEventListener('DOMContentLoaded', function () {
    // Get the skull container
    const skullContainer = document.querySelector('.skull-container');

    // Add CSS for enhanced 3D effect
    const style = document.createElement('style');
    style.textContent = `
      .skull-container {
        transform-style: preserve-3d;
        perspective: 800px;
        transition: transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
        transform-origin: center center;
        position: relative;
        z-index: 1;
      }
      
      .skull {
        transform-style: preserve-3d;
        backface-visibility: hidden;
      }
      
      /* Add subtle shadow for depth enhancement */
      .skull::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: -1;
      }
      
      .skull-container:hover .skull::after {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);

    // Calculate the center point of the skull
    const skullRect = skullContainer.getBoundingClientRect();
    const skullCenterX = skullRect.left + skullRect.width / 2;
    const skullCenterY = skullRect.top + skullRect.height / 2;

    // Add mouse move event to the document
    document.addEventListener('mousemove', function (event) {
        // Calculate mouse position relative to the center of the skull
        const mouseX = event.clientX - skullCenterX;
        const mouseY = event.clientY - skullCenterY;

        // Calculate the angle to rotate based on mouse distance from center
        // Normalize the rotation so it's more pronounced but doesn't go too far
        const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
        const maxRotation = 25; // Maximum rotation in degrees

        // Calculate rotation amounts with diminishing returns for more natural movement
        // The further the mouse is, the less additional rotation is applied
        const rotationFactor = Math.min(distance / 500, 1);
        const rotateY = (mouseX / distance) * maxRotation * rotationFactor;
        const rotateX = (mouseY / distance) * -maxRotation * rotationFactor;

        // Apply transform with a slight translation for parallax effect
        requestAnimationFrame(() => {
            skullContainer.style.transform = `
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateZ(10px)
        `;
        });
    });

    // Reset position when mouse leaves the window
    document.addEventListener('mouseleave', function () {
        skullContainer.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
    });

    // Recalculate skull center on window resize
    window.addEventListener('resize', function () {
        const skullRect = skullContainer.getBoundingClientRect();
        skullCenterX = skullRect.left + skullRect.width / 2;
        skullCenterY = skullRect.top + skullRect.height / 2;
    });
});