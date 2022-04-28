import random

print('Guess game')

correctAns = False
randnum = random.randint(0, 100)

print('Enter a number between 0:100')

while not correctAns:
    num = int(input("Enter number: "))
    if num > randnum:
        print("To hight")
    elif num < randnum:
        print("To low")
    else :
        print("Correct")
        correctAns = True
    
