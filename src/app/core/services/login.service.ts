import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_LOGIN } from '../Utilities/Api';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string):Observable<any> {


        const body = new FormData();
        body.append('username', username);
        body.append('password', password);


        console.log(body);

         return this.http.post<any>(API_LOGIN, body);

    }

}