import { readFile } from "fs/promises"

function sumAll(array: number[]): number {
    return array.reduce((prev, curr) => prev + curr, 0)
}

function firstLastDigit(line: string): number | null {
    const digits = line.match(new RegExp("[0-9]", "g"))

    if (digits === null) return null

    return Number(digits[0] + digits[digits.length - 1])
}

readFile("./input.txt")
    .then(data => {
        console.log(
            sumAll(data.toString().split("\n").map(line => {
                return firstLastDigit(line) ?? 0
            }))
        )
    })