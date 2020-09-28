import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs'
import { Store } from '@ngrx/store'
import { map, mergeMap, catchError, tap, withLatestFrom, concatMap } from 'rxjs/operators'
import { AcccountManagementService } from './account-management.service'
import RongIMLib from './RongIMLib-3.0.7-dev.es.js'

@Injectable()
export class AppEffects {

  // userInfo$ = createEffect(() => 
  //   this.actions$.pipe(
  //     ofType('Loading user info'),
  //     mergeMap(() => this.accSer.userinfo()
  //       .pipe(
  //         map(info => info.status == 'success' ? ({type: 'Loading user success', payloads: info}) : ({type: 'Loading user failure', payloads: info})),
  //         catchError(() => of({type: 'Loading user err'}))
  //       )), tap((data) => data)
  //   )
  // )

  // connectIM$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType('Logging into Rongcloud IM'),
  //     withLatestFrom(this.store.select(state => state['userInfo'])),
  //     mergeMap(([loginInfo, userInfo]) => {
  //       const rongConfig = {
  //         appkey: 'sfci50a7sx2ri',
  //       }, im = RongIMLib.init(rongConfig)
  //       return this.imConnect(im, userInfo)
  //         .pipe(
  //           map(info => ({type: 'Logging into Rongcloud IM success', payloads: {im, info}})),
  //           catchError(err => of({type: 'Logging into Rongcloud IM failure', payloads: err}))
  //         )
  //     }), tap(data => data)
  //   )
  // )

  // disconnectIM$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType('Logging out of Rongcloud IM'),
  //     withLatestFrom(this.store.select(state => state['userRongObj'])),
  //     mergeMap(([loginInfo, im]) => {
  //       return this.imDisconnect(im)
  //         .pipe(
  //           map(info => ({type: 'Logging out of Rongcloud IM success', payloads: info})),
  //           catchError(err => of({type: 'Logging out of Rongcloud IM failure', payloads: err}))
  //         )
  //     }), tap(data => data)
  //   )
  // )

  imConnect = (im, userID) => from(im.connect(userID))
  imDisconnect = (im) => from(im.disconnect())

  constructor(private actions$: Actions, private accSer: AcccountManagementService, private store: Store) {}
}
