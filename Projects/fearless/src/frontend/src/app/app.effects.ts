import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs'
import { map, mergeMap, catchError, tap, withLatestFrom, concatMap } from 'rxjs/operators'
import { AcccountManagementService } from './account-management.service'

@Injectable()
export class AppEffects {

  userInfo$ = createEffect(() => 
    this.actions$.pipe(
      ofType('Loading user info'),
      mergeMap(() => this.accSer.userinfo()
        .pipe(
          map(info => ({type: 'Loading user success', payloads: info})),
          catchError(() => of({type: 'Loading user err'}))
        )), tap((data) => data)
    )
  )

  constructor(private actions$: Actions, private accSer: AcccountManagementService) {}
}
