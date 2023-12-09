import { readFile } from "fs/promises"

function getNumbers(line: string): number[] {
    return Array.from(line.matchAll(new RegExp("[0-9]+", "g"))).map(item => Number(item))
}

function sumAll(array: number[]): number {
    return array.reduce((prev, curr) => prev + curr)
}

readFile("./input.txt")
    .then(data => data.toString().split("\n"))
    .then(lines => console.log(
        sumAll(lines.map(line => {
            const [winningLine, ownedLine] = line.split(":")[1].split("|")
            const winning = getNumbers(winningLine)
            const owned = getNumbers(ownedLine)

            const nMatches = owned.filter(num => winning.includes(num)).length
            return nMatches == 0 ? 0 : (2 ** (nMatches - 1))
        }))
    ))
