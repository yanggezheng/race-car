const socket = io();//client
document.querySelector('.racer.player1').style.position = 'relative';
document.querySelector('.racer.player2').style.position = 'relative';

document.querySelector('.player1Btn').addEventListener('click', function () {
    socket.emit('move1');
});

document.querySelector('.player2Btn').addEventListener('click', function () {
    socket.emit('move2');
});

socket.on('update', (data) => {
    const left1 = data.left1;
    const left2 = data.left2;
    document.querySelector('.racer.player1').style.left = left1 + 'px';
    document.querySelector('.racer.player2').style.left = left2 + 'px';
});

socket.on('over', () => {
    const div = document.body.appendChild(document.createElement('div'));
    div.textContent = 'Game Over';
    document.querySelector('.player1Btn').remove();
    document.querySelector('.player2Btn').remove();
});
