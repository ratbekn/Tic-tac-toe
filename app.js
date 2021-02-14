let cells = Array.from(document.querySelectorAll('.row > div'));
let step = 0;
cells.forEach(cell => cell.addEventListener(
    'click',
    event => {
        event.target.textContent = step % 2 == 0 ? 'X' : 'O';
        step += 1;
    }
));
