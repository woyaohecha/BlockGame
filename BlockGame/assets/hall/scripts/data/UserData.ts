import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UserData')
export class UserData {

    private static _userData: UserData;



    constructor() {

    }

    public static getInstance() {
        if (!this._userData) {
            this._userData = new UserData();
        }
        return this._userData;
    }
}


