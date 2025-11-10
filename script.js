const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let offsetX = 0;
let offsetY = 0;

// Assign initial positions (grid layout)
const columns = 5;
const gap = 20;
items.forEach((item, index) => {
  const row = Math.floor(index / columns);
  const col = index % columns;
  const left = col * (100 + gap);
  const top = row * (100 + gap);
  item.style.left = left + 'px';
  item.style.top = top + 'px';
});

// When a cube is clicked
items.forEach(item => {
  item.addEventListener('mousedown', e => {
    activeItem = item;
    offsetX = e.clientX - item.offsetLeft;
    offsetY = e.clientY - item.offsetTop;
    item.style.cursor = 'grabbing';
  });
});

// When dragging the cube
document.addEventListener('mousemove', e => {
  if (!activeItem) return;

  const containerRect = container.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();

  // Calculate new positions
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Constrain cube within container
  newLeft = Math.max(0, Math.min(newLeft, containerRect.width - itemRect.width));
  newTop = Math.max(0, Math.min(newTop, containerRect.height - itemRect.height));

  // Apply position
  activeItem.style.left = `${newLeft}px`;
  activeItem.style.top = `${newTop}px`;
});

// When mouse released
document.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem.style.cursor = 'grab';
    activeItem = null;
  }
});
