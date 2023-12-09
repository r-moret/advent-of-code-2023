import { readFile } from "fs/promises"

function matchingNumbers(scratchCard: string): number[] {
    function getNumbers(line: string): number[] {
        return Array.from(line.matchAll(new RegExp("[0-9]+", "g"))).map(item => Number(item))
    }

    const [winningLine, ownedLine] = scratchCard.split("|")
    const winning = getNumbers(winningLine)
    const owned = getNumbers(ownedLine)

    return owned.filter(num => winning.includes(num))
}

function sumAll(array: number[]): number {
    return array.reduce((prev, curr) => prev + curr)
}

readFile("./input.txt")
    .then(data => data.toString().split("\n"))
    .then(scratchcards => {
        const instances = Array.from(scratchcards, _ => 1)

        for (let [idxCard, card] of scratchcards.entries()) {
            const matchings = matchingNumbers(card.split(":")[1]).length

            for (let idxMatch = 0; idxMatch < matchings; idxMatch++) {
                instances[idxCard + idxMatch + 1] += instances[idxCard]
            }
        }

        console.log(sumAll(instances))
    })
