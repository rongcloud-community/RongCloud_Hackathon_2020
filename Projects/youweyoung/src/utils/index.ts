export * from './rtc'
export * from './pixi'
export * from './dragonbone'
export * from './db'
export * from './hash'
export * from './channel'
export * from './router'

export function sleep(ms: number) {
    return new Promise(res => {
        setTimeout(res, ms);
    })
}

export function deepCopy(e: any) {
    try {
        return JSON.parse(JSON.stringify(e))
    } catch (error) {

    }
}