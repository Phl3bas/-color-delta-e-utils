![npm](https://img.shields.io/npm/v/@color-delta-e/utils?color=crimson&label=latest&logo=npm&style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/min/@color-delta-e/utils?logo=npm&label=min&style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@color-delta-e/utils?logo=npm&label=min-zipped&style=flat-square) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Phl3bas/@color-delta-e/utils/CI?style=flat-square)


# @color-delta-e/utils

Utility functions for color-delta-e


## Installation

```bash
npm install color-delta-e @color-delta-e/utils

yarn add color-delta-e @color-delta-e/utils

pnpm add color-delta-e @color-delta-e/utils
```

## API


### `Filter`

filters a list of colors based on if they are perceivably different to the comparitor color

```typescript

interface FilterOptions {
  type: "rgb" | "hsl" | "lab" // only for declaring the type of ColorTuples
  threshold: number // default 5
}

declare function filter(comparitor: string | ColorTuple, toFilter: Array<string | ColorTuple>, options?: FilterOptions)

const filtered = filter('#dd2244', ['#dd2244' ,'#e83b3b', '#45b0b0'], { 
  threshold: 5,
  type: 'rgb' // only needed if using color tuples eg [255,255,255] otherwise colors are infered
})

console.log(filtered) // ['#e83b3b', '#45b0b0']

```



### `Sort`

sorts a list of colors based on their perceivable difference to the comparitor color, can


```typescript

interface SortOptions {
  type: "rgb" | "hsl" | "lab" // default: 'rgb' - Note: only for declaring the type of ColorTuples
  threshold: number // default 5
  direction: 'asc' | 'dec' // default 'asc'
}

declare function sort(comparitor: string | ColorTuple, toSort: Array<string | ColorTuple>, options?: SortOptions)

const sorted = sort('#dd2244', ['#e83b3b', '#db2424', '#df1111', '#b50303'], {
   threshold: 5,
   direction: 'asc' // 'asc' | 'dec'
   type: 'rgb' // only needed if using color tuples eg [255,255,255] otherwise colors are infered
})

console.log(sorted) // ['#b50303', '#df1111', '#db2424', '#e83b3b']

```



### `Pipe`

A color-delta-e specific version of pipe, interface of functions passed to it have to follow a specifc structure.

pass in pipeable functions, and will return a new function that will perform those actions on the array with comparitor, the returning array will be passed to the next function as its new array argument.

```typescript
type PipeableOptionInterface = Record<string, any> 
  && { 
    type: "rgb" | "hsl" | "lab",
    threshold: number
    }


// a pipeable function has to follow this interface
declare function pipeableInterface(comparitor: string | ColorTuple, toPipe: Array<string | ColorTuple>, options?: PipeableOptionInterface )




const pipedFilterSort = pipe(filter, sort)

const result = pipedFilterSort('#dd2244', ['#dd2244' ,'#e83b3b', '#45b0b0'], {
  //a union of all piped functions options
})

console.log(result) // ['#45b0b0', '#e83b3b']

```
