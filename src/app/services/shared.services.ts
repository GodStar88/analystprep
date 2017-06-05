import { Injectable } from '@angular/core';
import { User } from './index';

@Injectable()
export class SharedService {

    constructor() { }

    getUser(): User {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser;
    }

    setUser(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}
