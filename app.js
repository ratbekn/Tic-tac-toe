let cells = Array.from(document.querySelectorAll('.row > div'));
let step = 0;
let isGameOver = false;

let mainDiagonal = ['top left', 'center middle', 'bottom right'];
let sideDiagonal = ['bottom left', 'center middle', 'top right'];

cells.forEach(cell => cell.addEventListener(
    'click',
    event => {
        if (isGameOver) {
            document.querySelector('#board > h3').remove();

            cells.forEach(cell => cell.textContent = '');
            step = 0;
            isGameOver = false;
        }

        event.target.textContent = step % 2 == 0 ? 'X' : 'O';
        step += 1;

        let possibleWinMarks = [];

        for (let cellGroup of event.target.classList) {
            const winMarks = cells.filter(cell => cell.classList.contains(cellGroup))
                .map(cell => cell.textContent);

            possibleWinMarks.push(winMarks);
        }

        if (mainDiagonal.includes(event.target.classList.value)) {
            const winMarks = cells.filter(cell => mainDiagonal.includes(cell.classList.value))
                .map(cell => cell.textContent);

            possibleWinMarks.push(winMarks);
        }

        if (sideDiagonal.includes(event.target.classList.value)) {
            winMarks = cells.filter(cell => sideDiagonal.includes(cell.classList.value))
                .map(cell => cell.textContent);

            possibleWinMarks.push(winMarks);
        }

        for (let winMarks of possibleWinMarks) {
            checkIfGameOver(winMarks);
        }

        if (!isGameOver && step == 9) {
            printResult('Draw!');

            isGameOver = true;
        }
    }
));

function checkIfGameOver(winMarks) {
    if (winMarks.length > 0 && winMarks.every(mark => mark == winMarks[0])) {
        printResult(`The '${winMarks[0]}' player won!`)

        isGameOver = true;
    }
}

function printResult(resultText) {
    let result = document.createElement('h3');
    let gameTitle = document.querySelector('#board > h1');
    result.textContent = resultText;
    gameTitle.parentNode.insertBefore(result, gameTitle.nextSibling);
}
