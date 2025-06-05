import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_LOGIN } from '../Utilities/Api';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    login(form: any) {

        this.http.post(API_LOGIN, form).subscribe({
            next: (response) => {
                console.log('a');
                
                console.log(response);
            },
            error: (error) => {
                console.error(error);
            }
        })

    }

}