import Arraise from "../../src/index"
const arraise = new Arraise()

describe("test min method", () => {
    test("find min element in array", () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8]
        expect(arraise.min(array)).toBe(1)
    })

    test("find min element in array #2", () => {
        const array = [-1, 0, 6, 7, 8]
        expect(arraise.min(array)).toBe(-1)
    })
})