const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("public"));
const server = http.createServer(app);
const io = new Server(server);

const users = {
    x: false,
    o: false,
};

/**
 * @type {"x":"o"}
 */
let round = "x";

const emptyBoard = () => {
    return [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
};

const isWinnerPlace = (n1, n2, n3) => {
    const boardFlat = board.flat();
    return (
        boardFlat[n1] == boardFlat[n2] &&
        boardFlat[n2] == boardFlat[n3] &&
        boardFlat[n3]
    );
};

const checkWinner = () => {
    const winner =
        isWinnerPlace(0, 1, 2) ||
        isWinnerPlace(3, 4, 5) ||
        isWinnerPlace(6, 7, 8) ||
        isWinnerPlace(0, 3, 6) ||
        isWinnerPlace(1, 4, 7) ||
        isWinnerPlace(2, 5, 8) ||
        isWinnerPlace(0, 4, 8) ||
        isWinnerPlace(6, 4, 2) ||
        "";
    io.emit("winner", winner);
};

let board = emptyBoard();

io.on("connection", (socket) => {
    console.log("a user connected");

    const getPlayerBySocketId = () => {
        if (users.x == socket.id) return "x";
        else return "o";
    };

    if (!users.x) {
        socket.emit("on-player", "x");
        users.x = socket.id;
    } else if (!users.o) {
        socket.emit("on-player", "o");
        users.o = socket.id;
    }

    socket.on("send", (x, y, callback) => {
        console.log(round);
        console.log(getPlayerBySocketId());
        if (round != getPlayerBySocketId()) return;
        if (board[y][x] != "") return;
        console.log("ok");
        board[y][x] = round;
        io.emit("send", x, y, round);
        if (round == "x") round = "o";
        else round = "x";
        callback();
        checkWinner();
    });

    socket.on("disconnect", () => {
        console.log("a user disconnected");
        round = "x";
        board = emptyBoard();
        io.emit("clear");
        switch (socket.id) {
            case users.x:
                users.x = "";
                break;
            case users.o:
                users.o = "";
                break;
        }
    });

    console.log(users);
});

server.listen(8000, () => {
    console.log("listen on http://localhost:8000");
});
