import re

with open("./input.txt") as file:
    data = file.read().split("\n")


def first_last_digit(line: str) -> int:
    digits = re.findall("[0-9]", line)
    return int(digits[0] + digits[-1])


print(sum([first_last_digit(line) for line in data]))
