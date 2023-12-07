import { readFile } from "fs/promises"

function range(start: number, length: number) {
    return Array.from({ length: length }, (_, i) => start + i)
}

function operateAll(array: number[], operation: (first: number, second: number) => number): number {
    return array.reduce((prev, curr) => operation(prev, curr))
}

function findNumbers(line: string): { num: number, indexes: number[] }[] {
    return Array.from(line.matchAll(new RegExp("[0-9]+", "g"))).map(match => {
        return {
            num: Number(match[0]),
            indexes: range(match["index"], match[0].length)
        }
    })
}

class CharacterFound {
    constructor(
        public vPos: number,
        public hPos: number[],
        public schematic: string[],
        public value: string
    ) { }

    public surroundingNumbers(): number[] {
        const vIndexes = range(this.vPos - 1, 3)
        const hIndexes = range(this.hPos[0] - 1, this.hPos.length + 2)

        return vIndexes.reduce((prev, vIdx) => {
            return [
                ...prev,
                ...findNumbers(this.schematic[vIdx])
                    .filter(item => item.indexes.filter(index => hIndexes.includes(index)).length != 0)
                    .map(item => item.num)]
        }, [] as number[])
    }

    public static find(schematic: string[], char: string): CharacterFound[] {
        return schematic.reduce((prev, line, vIndex) => {
            return [
                ...prev,
                ...Array.from(line.matchAll(new RegExp(`[${char}]`, "g")))
                    .map(match => new CharacterFound(vIndex, [match["index"]], schematic, char))
            ]
        }, [] as CharacterFound[])
    }
}


readFile("./input.txt")
    .then(data => data.toString().split("\n"))
    .then(schema => console.log(
        operateAll(
            CharacterFound.find(schema, "*")
                .filter(found => found.surroundingNumbers().length > 1)
                .map(partGear => operateAll(partGear.surroundingNumbers(), (f, s) => f * s)),
            (f, s) => f + s
        )
    )
    )
