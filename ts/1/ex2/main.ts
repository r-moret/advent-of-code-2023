import { readFile } from "fs/promises";

const NUMBERS = {
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

function translateNumber(num: string): string {
    // If it is a spelled number return the number itself
    return NUMBERS[num as keyof typeof NUMBERS] ?? num
}

function sumAll(array: number[]): number {
    return array.reduce((prev, curr) => prev + curr, 0)
}

function firstLastDigit(line: string): number {
    // Unlike the previous challenge, in this case it may be some overlapping
    // cases, so we need to use matchAll, lookaheads and capture groups 
    // to retrieve all the correct digits value 
    // (ex: hjd3oneightkjdf4ju) -> [3, one, eight, 4]

    const digitsRegex = `(?=([1-9]|${Object.keys(NUMBERS).join("|")}))`

    const digits = Array.from(
        line.matchAll(new RegExp(digitsRegex, "g"))
    ).map(match => match[1])

    const first = translateNumber(digits[0])
    const last = translateNumber(digits[digits.length - 1])

    return Number(first + last)
}

readFile("./input.txt")
    .then(data => {
        console.log(
            sumAll(data.toString().split("\n").map(firstLastDigit))
        )
    })
