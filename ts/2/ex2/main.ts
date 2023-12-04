import { readFile } from "fs/promises";

class CubeSet {
    red: number = 0
    blue: number = 0
    green: number = 0

    constructor(configuration: string) {
        Array.from(
            configuration.matchAll(new RegExp("([0-9]+) (green|blue|red)", "g"))
        ).map(cube => this[cube[2]] = Number(cube[1]))
    }
}


function sumAll(array: number[]): number {
    return array.reduce((prev, curr) => prev + curr)
}

function powerMinCubes(line: string): number {
    const idMatch = line.match(new RegExp("Game ([0-9]+): (.+)"))

    if (idMatch === null) return 0
    const [, , sets, ,] = idMatch

    const maxColors = sets
        .split("; ")
        .map(set => new CubeSet(set))
        .reduce((prevSet, set) => {
            return {
                red: Math.max(prevSet.red, set.red),
                green: Math.max(prevSet.green, set.green),
                blue: Math.max(prevSet.blue, set.blue),
            }
        }, { red: 0, green: 0, blue: 0 })

    return maxColors.red * maxColors.green * maxColors.blue
}


readFile("./input.txt")
    .then(data => {
        console.log(
            sumAll(data.toString().split("\n").map(powerMinCubes))
        )
    })
