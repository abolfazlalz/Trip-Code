let player = "";

var socket = io();

socket.on("on-player", (p) => {
    player = p;
});

$(".btn").on("click", (e) => {
    const btn = e.currentTarget;
    const x = btn.getAttribute("x");
    const y = btn.getAttribute("y");
    console.log(x, y);
    socket.emit("send", x, y, () => {
        e.currentTarget.innerText = player;
    });
});
console.log();

socket.on("send", (x, y, player) => {
    const btn = $(`button[y=${y}][x=${x}]`);
    btn.text(player);
    console.log(btn);
});

socket.on("clear", () => {
    $(".btn").text("");
});

socket.on("winner", (winner) => {
    if (winner != "") alert(`Winner is ${winner}`);
});
