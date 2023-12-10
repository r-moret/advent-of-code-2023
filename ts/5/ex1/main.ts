import { readFile } from "fs/promises";

type Range = [number, number]
class Mapping {
    constructor(public intervals: [Range, Range][] = []) { }

    public get(source: number) {
        const [interval] = this.intervals.filter(
            interval => source >= interval[0][0] && source <= interval[0][1]
        )

        if (interval == undefined) return source

        const [[sourceStart,], [destStart,]] = interval
        return destStart + source - sourceStart
    }

    public union(other: Mapping): Mapping {
        return new Mapping([...this.intervals, ...other.intervals])
    }
}

function min(array: number[]): number {
    return array.reduce((prev, curr) => Math.min(prev, curr))
}

readFile("./input.txt")
    .then(data => data.toString().split("\n\n"))
    .then(data => {
        const [seedsLine, ...mappingLines] = data
        const seeds = Array.from(seedsLine.matchAll(new RegExp("[0-9]+", "g"))).map(seed => Number(seed))

        const mappings = mappingLines.map(mapping => {
            return Array.from(mapping.matchAll(new RegExp("([0-9]+) ([0-9]+) ([0-9]+)", "g")))
                .map(match => {
                    const [dest, source, length] = match.slice(1, 4).map(Number)
                    const interval: [Range, Range] = [[source, source + length - 1], [dest, dest + length - 1]]
                    return new Mapping([interval])
                })
                .reduce((prev, curr) => prev.union(curr))
        })

        return min(mappings.reduce((prev, mapping) => {
            return prev.map(source => mapping.get(source))
        }, seeds))
    })
    .then(res => console.log(res))
