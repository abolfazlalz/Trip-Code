board = [
        "0", "1", "2",
        "3", "4", "5",
        "6", "7", "8"
]

winner_index = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
]

def check_winner():
    for col in winner_index:
        index1 = board[col[0]]
        index2 = board[col[1]]
        index3 = board[col[2]]

        if index1 == index2 and index2 == index3:
            print("winner: ", index1)
            return True
            exit()
    
    return False

player = False
while True:
    for i in range(9):
        if i % 3 == 0:
            print()
        print(board[i], end='\t')
    print()
    playerName = "X"
    if not player:
        playerName = "O"
    index = int(input('Round  ' + playerName + ': '))
    board[index] = playerName
    player = not player
    if check_winner():
        exit()
    
