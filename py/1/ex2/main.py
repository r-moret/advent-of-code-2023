import re

with open("./input.txt") as file:
    data = file.read().split("\n")

NUMBERS = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
}


def first_last_digit(line: str) -> int:
    regex = f"(?=([0-9]|{"|".join(list(NUMBERS.keys()))}))"
    digits = [NUMBERS.get(digit, digit) for digit in re.findall(regex, line)]

    return int(digits[0] + digits[-1])


print(sum([first_last_digit(line) for line in data]))
