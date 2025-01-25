class Left<L,R> {
    readonly reason: L
    constructor(reason: L) {
        this.reason = reason
    }

    isRight(): this is Right<L,R> {
        return false
    }

    isLeft(): this is Left<L,R> {
        return true
    }
}

class Right <L,R> {
    readonly value: R; 
    constructor(value: R) {
        this.value = value
    }

    isRight(): this is Right<L,R> {
        return true
    }

    isLeft(): this is Left<L,R> {
        return false
    }
}

export type Either<L,R> = Right<L,R> | Left<L,R>

export const success = <L,R>(value: R) => new Right<L,R>(value)
export const failure = <L,R>(reason: L) => new Left<L,R>(reason)
