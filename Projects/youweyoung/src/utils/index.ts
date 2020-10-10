export * from './rtc'
export * from './pixi'
export * from './dragonbone'
export * from './db'
export * from './hash'
export * from './channel'

export function sleep(ms:number){
    return new Promise(res=>{
        setTimeout(res, ms);
    })
}