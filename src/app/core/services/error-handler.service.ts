/* eslint-disable no-console */
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiError } from '../models/api.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse): Observable<ApiError> {
    // A client-side or network error occurred. Handle it accordingly.
    if (error.status === 0) {
      console.error(
        `%c Fetching data failed on client-side: ${error.error.message}`,
        'color: red',
      );
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `%c Backend returned status ${error.status}, code was: ${error.error?.code}`,
        'color: red',
      );
    }

    // Return an observable with a user-facing error message.
    return throwError(
      (): ApiError => ({
        code: error.error?.code,
        message: error.message || error.statusText,
        data: error.error?.data,
        isError: true,
      }),
    );
  }
}
