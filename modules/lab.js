

export const STILL_LIFE = [
    {
        id: 0,
        name: 'Block',
        cells: [
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0]
        ],
        usecases: [
            "higher still lifes",
            "catalyst",
        ],
        size: 4,
        category: 'still lifes',
    },
    {
        id: 1,
        name: "Beehive",
        cells: [
            [0,0,0,0,0,0],
            [0,0,1,1,0,0],
            [0,1,0,0,1,0],
            [0,0,1,1,0,0],
            [0,0,0,0,0,0]
            [0,0,0,0,0,0]
        ],
        usecases: [
            "Glider synthesis",
        ],
        size: 6,
        category: 'still lifes',
    },
    {
        id: 2,
        name: "Aircraft carrier",
        cells: [
            [0,0,0,0,0,0],
            [0,0,0,1,1,0],
            [0,1,0,0,1,0],
            [0,1,1,0,0,0],
            [0,0,0,0,0,0]
            [0,0,0,0,0,0]
        ],
        usecases: [
            "larger still lifes",
        ],
        size: 6,
        category: 'still lifes',
    },
    {
        id: 3,
        name: 'Boat',
        cells: [
            [0,0,0,0,0],
            [0,1,1,0,0],
            [0,1,0,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0]
        ],
        usecases: [
            "catalyst",
        ],
        size: 5,
        extensible: true,
        category: 'still lifes',
    },
    {
        id: 4,
        name: 'Tub',
        cells: [
            [0,0,0,0,0],
            [0,0,1,0,0],
            [0,1,0,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0]
        ],
        usecases: [
            "induction coil",
            "catalyst",
        ],
        size: 5,
        category: 'still lifes',
    },
    {
        id: 5,
        name: 'Snake',
        cells: [
            [0,0,0,0,0,0],
            [0,0,1,1,0,0],
            [0,0,0,1,0,0],
            [0,0,1,0,0,0],
            [0,0,1,1,0,0],
            [0,0,0,0,0,0],
        ],
        usecases: [
            "induction coil",
        ],
        size: 6,
        category: 'still lifes',
    },
    {
        id: 6,
        name: 'Ship',
        cells: [
            [0,0,0,0,0],
            [0,1,1,0,0],
            [0,1,0,1,0],
            [0,0,1,1,0],
            [0,0,0,0,0]
        ],
        usecases: [
            "catayst",
        ],
        extensible: true,
        size: 5,
        category: 'still lifes',
    },
    {
        id: 7,
        name: 'Pont',
        cells: [
            [0,0,0,0,0,0],
            [0,0,1,1,0,0],
            [0,1,0,0,1,0],
            [0,1,0,0,1,0],
            [0,0,1,1,0,0],
            [0,0,0,0,0,0],
        ],
        usecases: [

        ],
        size: 6,
        category: 'still lifes',
    },
    {
        id: 8,
        name: 'Loaf',
        cells: [
            [0,0,0,0,0,0],
            [0,0,1,1,0,0],
            [0,1,0,0,1,0],
            [0,0,1,0,1,0],
            [0,0,0,1,0,0],
            [0,0,0,0,0,0]
        ],
        usecases: [
            "still lifes",
            "catalysis"
        ],
        size: 6,
        category: 'still lifes',
    },
    {
        id: 9,
        name: "Eater 1",
        cells: [
            [0,0,0,0,0,0,],
            [0,1,1,0,0,0,],
            [0,1,0,1,0,0,],
            [0,0,0,1,0,0,],
            [0,0,0,1,1,0,],
            [0,0,0,0,0,0,],
        ],
        usecases: [
            "to eat gliders",
        ],
        size: 6,
        category: 'still lifes',
    },
    {
        id: 10,
        name: "Eater 2",
        cells: [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,0,1,1,0],
            [0,0,1,1,1,0,1,1,0],
            [0,1,0,0,0,0,0,0,0],
            [0,0,1,1,1,0,1,1,0],
            [0,0,0,0,1,0,1,0,0],
            [0,0,0,0,1,0,1,0,0],
            [0,0,0,0,0,1,0,0,0]
            [0,0,0,0,0,0,0,0,0]
        ],
        usecases: [
            "to eat objects other than gliders",
            "catalysis"
        ],
        size: 9,
        category: 'still lifes',
    },
    {
        id: 11,
        name: 'Beacon',
        cells: [
            [0,0,0,0,0,0],
            [0,1,1,0,0,0],
            [0,1,0,0,0,0],
            [0,0,0,0,1,0],
            [0,0,0,1,1,0],
            [0,0,0,0,0,0]
        ],
        usecases: [
            "oscillator",
        ],
        size: 6,
        category: 'oscillators',
    },
    {
        id: 12,
        name: 'Blinker',
        cells: [
            [0,0,0,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0]
        ],
        usecases: [
            "oscillator",
        ],
        size: 5,
        category: 'oscillators',
    },
    {
        id: 13,
        name: 'Figure eight',
        cells: [
            [0,0,0,0,0,0,0,0],
            [0,1,1,1,0,0,0,0],
            [0,1,1,1,0,0,0,0],
            [0,1,1,1,0,0,0,0],
            [0,0,0,0,1,1,1,0],
            [0,0,0,0,1,1,1,0],
            [0,0,0,0,1,1,1,0],
            [0,0,0,0,0,0,0,0]
        ],
        usecases: [
            "oscillator",
        ],
        size: 8,
        category: 'oscillators',
    },
    {
        id: 14,
        name: 'Toad',
        cells: [
            [0,0,0,0,0,0],
            [0,0,1,0,0,0],
            [0,0,1,1,0,0],
            [0,0,1,1,0,0],
            [0,0,0,1,0,0],
            [0,0,0,0,0,0]
        ],
        usecases: [
            "induction coil",
            "catalysis",
            "one-time turner"
        ],
        size: 6,
        category: 'oscillators',
    },
    {
        id: 15,
        name: 'Acorn',
        cells: [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0,0],
            [0,0,0,0,1,0,0,0,0],
            [0,1,1,0,0,1,1,1,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ],
        usecases: [
            "spaceship",
        ],
        size: 9,
        category: 'methuselahs',
    },
    {
        id: 16,
        name: 'B-heptomino',
        cells: [
            [0,0,0,0,0,0],
            [0,0,1,1,0,0],
            [0,1,1,0,0,0],
            [0,0,1,1,0,0],
            [0,0,0,1,0,0]
            [0,0,0,0,0,0],
        ],
        usecases: [
            "spaceship",
        ],
        size: 6,
        category: 'methuselahs',
    },
    {
        id: 17,
        name: 'Bunnies',
        cells: [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,1,0,0],
            [0,0,0,1,0,0,0,1,0,0],
            [0,0,0,1,0,0,1,0,1,0],
            [0,0,1,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
        ],
        usecases: [
            "spaceship",
        ],
        size: 10,
        category: 'methuselahs',
    },
    {
        id: 18,
        name: 'Herschel',
        cells: [
            [0,0,0,0,0,0],
            [0,1,0,0,0,0],
            [0,1,1,1,0,0],
            [0,1,0,1,0,0],
            [0,0,0,1,0,0],
            [0,0,0,0,0,0],
        ],
        usecases: [
            "spaceship",
        ],
        size: 6,
        category: 'methuselahs',
    },
    {
        id: 19,
        name: 'Glider',
        cells: [
            [0,0,0,0,0],
            [0,0,1,0,0],
            [0,0,0,1,0],
            [0,1,1,1,0],
            [0,0,0,0,0]
        ],
        usecases: [
            "spaceship",
        ],
        size: 5,
        category: 'spaceships',
    },
    {
        id: 20,
        name: 'Lightweight spaceship',
        cells: [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,1,1,0,0,0],
            [0,1,1,0,1,1,0],
            [0,0,1,1,1,1,0],
            [0,0,0,1,1,0,0],
            [0,0,0,0,0,0,0]
        ],
        usecases: [
            "spaceship",
        ],
        size: 7,
        category: 'spaceships',
    },
    {
        id: 21,
        name: 'Middleweight spaceship',
        cells: [
            [0,0,0,0,0,0,0,0],
            [0,0,1,1,0,0,0,0],
            [0,1,1,0,1,1,1,0],
            [0,0,1,1,1,1,1,0],
            [0,0,0,1,1,1,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        usecases: [
            "spaceship",
        ],
        size: 8,
        category: 'spaceships',
    },
    {
        id: 22,
        name: 'Heavyweight spaceship',
        cells: [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,0,0],
            [0,1,1,0,1,1,1,1,0,0],
            [0,0,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
        ],
        usecases: [
            "spaceship",
        ],
        size: 10,
        category: 'spaceships',
    },
    {
        id: 23,
        name: "fuse",
        cells: [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,0],
            [0,0,0,0,0,0,1,0,1,0],
            [0,0,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0],
            [0,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
        ],
        usecases: [
            "spaceship",
        ],
        category: 'Wicks',
        size: 10,
    },
    {
        id: 24,
        name: "ants",
        cells: [
            [0,0,0,0,0,0],
            [0,1,1,0,0,0],
            [0,0,0,1,1,0],
            [0,0,0,1,1,0],
            [0,1,1,0,0,0],
            [0,0,0,0,0,0],
        ],
        usecases: [
            "spaceship",
        ],
        category: 'Wicks',
        size: 6,
    },
    {
        id: 25,
        name: 'Gosper glider gun',
        cells: [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
            [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ],
        usecases: [
            "spaceship",
        ],
        category: 'guns',
        size: 38,
    },
    {
        id: 26,
        name: 'Simkinglidergun',
        cells: [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ],
        usecases: [
            "spaceship",
        ],
        category: 'guns',
        size: 38,
    }
]