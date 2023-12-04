import { readFile } from "fs/promises";


const OK_CONFIG = {
    red: 12,
    green: 13,
    blue: 14,
}

class CubeSet {
    red: number = 0
    blue: number = 0
    green: number = 0

    constructor(configuration: string) {
        Array.from(
            configuration.matchAll(new RegExp("([0-9]+) (green|blue|red)", "g"))
        ).map(cube => this[cube[2]] = Number(cube[1]))
    }

    public isValid(): boolean {
        return (
            this.red <= OK_CONFIG.red &&
            this.blue <= OK_CONFIG.blue &&
            this.green <= OK_CONFIG.green
        )
    }
}


function sumAll(array: number[]): number {
    return array.reduce((prev, curr) => prev + curr)
}

function validSetsId(line: string): number {
    const idMatch = line.match(new RegExp("Game ([0-9]+): (.+)"))

    if (idMatch === null) return 0
    const [, id, sets, ,] = idMatch

    const isValid = sets
        .split("; ")
        .map(set => new CubeSet(set))
        .every(set => set.isValid())

    return isValid ? Number(id) : 0
}


readFile("./input.txt")
    .then(data => {
        console.log(
            sumAll(data.toString().split("\n").map(validSetsId))
        )
    })
