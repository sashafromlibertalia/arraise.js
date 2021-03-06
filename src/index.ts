interface ArraiseMethods<T> {
    //////////////////////////////// Common //////////////////////////////////
    /**
    * Compares 2 arrays or objects
    * @param array1 - first array to compare
    * @param array2 - second array to compare
    * 
    * @param obj1 - first object to compare
    * @param obj2 - second object to compare
    * @example arraise.areSame([1, 2], [1,2]) // true
    */
    areSame(...args: [array1: T[], array2: T[]] | [obj1: Object, obj2: Object]): Boolean


    //////////////////////////////// Arrays //////////////////////////////////
    /**
     * Returns modified array with unique elements
     * @param array - array to be modified
     * @example [1, 1, 2, 3] => [1, 2, 3]
     */
    makeUnique(array: T[]): T[];

    /**
    * Finds maximum value in given array
    * @param array - array to find maximum value
    * @example [1, 2, 3] => 3
    */
    max(array: number[] | string[]): number | string;

    /**
    * Merge provided arrays
    * @param unique - `true` - remove duplicated items, `false` - store duplicated items. Default - `false`
    * @param args - arrays to merge
    * @example [1, 2, 3], [1, 3] => [1, 2, 3, 1, 3]
    */
    merge(unique: boolean, ...args: T[][]): T[];

    /**
     * Finds minimum value in given array
     * @param array - array to find minimum value
     * @example [1, 2, 3] => 1
     */
    min(array: number[] | string[]): number | string;

    /**
     * Sorts array in ascending order: 
     * @param array - array to be sorted
     * @example [1, 5, 3] => [1, 3, 5]
     */
    sortAscending(array: T[]): T[];

    /**
     * Sorts array in descending order: 
     * @param array - array to be sorted
     * @example [1, 5, 3] => [5, 3, 1]
     */
    sortDescending(array: T[]): T[];

    /**
     * Finds common elements in provided arrays
     * @param args - arrays to find in
     * @example [1, 2, 3] && [1, 2] => [1, 2]
     */
    findCommon(...args: T[][]): T[]

    /**
     * Finds different elements in provided arrays
     * @param args - arrays to find in
     * @example [1, 2, 3] && [1, 2] => [1, 2]
     */
    findDifference(...args: T[][]): T[]

    /**
     * Swaps elements in given array. Provide indexes to swap.
     * @param arr - array
     * @param first - first index to swap
     * @param last - last index to swap
     * @example [1, 2, 3] (0, 1) => [2, 1, 3]
     */
    swap(arr: T[], first: number, last: number): T[]

    /**
     * Converts array to list of arrays
     * @param array - input array
     * @param level - amount of elements in subarrays. Only integer
     * @example [1, 2, 3], level = 2 => [[1, 2], 3]
     */
    toArrayList(array: any[], level: number): any[][]


    //////////////////////////////// Objects //////////////////////////////////
}

export default class Arraise implements ArraiseMethods<any> {
    constructor() { }

    makeUnique(array: any[]): any[] {
        return [...new Set<any>(array)]
    }

    merge(unique: boolean = false, ...args: any[][]): any[] {
        if (!args.length) throw new Error("Nothing to merge")

        let result: any[] = [].concat(...args)
        if (unique) result = [...new Set<any>(result)]

        return result
    }

    min(array: number[] | string[]): number | string {
        if (!array.length) throw new Error("Can't find value in empty array")
        return array.sort((a: number | string, b: number | string) => {
            return ('' + a.toString()).localeCompare(b.toString())
        }).shift()
    }

    max(array: number[] | string[]): number | string {
        if (!array.length) throw new Error("Can't find value in empty array")
        return array.sort((a: number | string, b: number | string) => {
            return ('' + a.toString()).localeCompare(b.toString())
        }).slice(-1).pop()
    }

    sortAscending(array: any[]): any[] {
        return array.sort()
    }

    sortDescending(array: any[]): any[] {
        return array.sort().reverse()
    }

    areSame(...args: [array1: any[], array2: any[]] |
    [obj1: Object, obj2: Object]): Boolean {
        const obj1 = args[0]
        const obj2 = args[1]

        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            if (obj1.length !== obj2.length)
                return false

            return JSON.stringify(obj1) === JSON.stringify(obj2)
        }
        else {
            const allKeys = (obj, prefix = '') =>
                Object.keys(obj).reduce((res, el) => {
                    if (typeof obj[el] === 'object' && obj[el] !== null) {
                        return [...res, ...allKeys(obj[el], prefix + el + '.')];
                    }
                    return [...res, prefix + el];
                }, []);

            const allValues = (obj, prefix = '') =>
                Object.values(obj).reduce((res: any[], el) => {
                    if (typeof el === 'object' && el !== null) {
                        const key = Object.keys(obj).find(key => obj[key] === el)
                        return [...res, ...allValues(obj[key], prefix + el + '.')];
                    }
                    return [...res, prefix + el];
                }, []);


            const obj1Keys = allKeys(obj1)
            const obj2Keys = allKeys(obj2)

            const obj1Values = allValues(obj1)
            const obj2Values = allValues(obj2)

            return JSON.stringify(obj1Keys) === JSON.stringify(obj2Keys) &&
                JSON.stringify(obj1Values) === JSON.stringify(obj2Values)
        }
    }

    findCommon(...args: any[][]): any[] {
        return args.reduce((first, second) => {
            return first.filter(el => second.includes(el));
        })
    }

    findDifference(...args: any[][]): any[] {
        return args.reduce((first, second) => {
            return first.filter(el => !second.includes(el));
        })
    }

    swap(arr: any[], first: number, last: number): any[] {
        if (!arr.length) throw new Error("Array is empty")
        if (first < 0 || last < 0) throw new Error("Indexes can't be negative numbers")
        if (first > arr.length - 1 || last > arr.length - 1) throw new Error("Index out of range")

        const temp = arr[last]
        arr[last] = arr[first]
        arr[first] = temp

        return arr
    }

    toArrayList(array: any[], level: number): any[][] {
        if (level < 0) throw new Error("Level can't be negative")
        if (level % 10 < 1) throw new Error("Level can't be double")

        let result = []
        for (let i = 0; i < array.length; i += level) {
            result.push(array.slice(i, i + level))
        }

        return result
    }
}