const p1 = {
    score: 0,
    button: document.querySelector('#p1_add'),
    display: document.querySelector('#player_1d')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2_add'),
    display: document.querySelector('#player_2d')
}


let winScore = 3;
let gameOver= false;

const reset = document.querySelector('#reset');
const options = document.querySelector('#options');

function updateScores(player, opponent){
    if(!gameOver)
    {
        player.score += 1;
        if(player.score === winScore)
        {
            gameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

p1.button.addEventListener('click', () => updateScores(p1,p2))

p2.button.addEventListener('click',() => updateScores(p2,p1))


options.addEventListener('change', function () {
    winScore = parseInt(this.value);
    resety();
})

reset.addEventListener('click', resety)

function resety() {
    gameOver = false;
    p1.score = 0;
    p2.score= 0;
    p1.display.textContent = p1.score;
    p2.display.textContent = p2.score;
    p1.display.classList.remove('has-text-success','has-text-danger');
    p2.display.classList.remove('has-text-success','has-text-danger');
    p1.button.disabled = false;
    p2.button.disabled = false;
}

