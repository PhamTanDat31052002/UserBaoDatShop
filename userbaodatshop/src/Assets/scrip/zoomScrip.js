
const container = document.querySelector('.maxImgDT');
const image = document.getElementById('imgDT');

container.addEventListener('mousemove', function (e) {
const x = e.clientX - container.offsetLeft;
const y = e.clientY - container.offsetTop;

image.style.transformOrigin = `${x}px ${y}px`;
});

container.addEventListener('mouseenter', function () {
image.classList.add('zoomed');
});

container.addEventListener('mouseleave', function () {
image.classList.remove('zoomed');
});
