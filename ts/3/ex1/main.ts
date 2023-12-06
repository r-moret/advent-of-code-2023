import { readFile } from "fs/promises"

class FoundNumber {
    constructor(
        public value: number,
        public vPos: number,
        public hPos: [number, number]
    ) { }

    public surroundings(): [number, number][] {
        const vIndexes = [this.vPos - 1, this.vPos, this.vPos + 1]
        const hIndexes = Array.from(
            { length: (this.hPos[1] + 1) - (this.hPos[0] - 1) + 1 },
            (_, idx) => this.hPos[0] - 1 + idx
        )

        const surr = [] as [number, number][]
        for (let vIdx of vIndexes) {
            for (let hIdx of hIndexes) {
                surr.push([vIdx, hIdx])
            }
        }

        return surr
    }
}

class Schematic {
    constructor(
        public schema: string[]
    ) { }

    private numbers(): FoundNumber[] {
        return this.schema.reduce((prev, line, index) => {
            const lineNumbers = Array.from(line.matchAll(new RegExp("[0-9]+", "g")))
                .map(match => new FoundNumber(
                    Number(match[0]),
                    index,
                    [match["index"], match["index"] + match[0].length - 1]
                ))

            return [...prev, ...lineNumbers]
        }, [] as FoundNumber[])
    }

    public partNumbers(): number[] {
        return this.numbers().filter(number => {
            // If a surrounding number is a symbol, the number itself is a part
            return number.surroundings().some(([vIdx, hIdx]) => {
                return (
                    this.schema[vIdx]?.[hIdx] != undefined &&             // well defined
                    this.schema[vIdx][hIdx] != "." &&                     // not a dot
                    !(new RegExp("[0-9]").test(this.schema[vIdx][hIdx]))  // not a number 
                )
            })
        }).map(partNumber => partNumber.value)
    }
}

function sumAll(array: number[]): number {
    return array.reduce((prev, curr) => prev + curr)
}

readFile("./input.txt")
    .then(data => data.toString().split("\n"))
    .then(schema => console.log(
        sumAll(new Schematic(schema).partNumbers())
    ))