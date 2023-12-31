import { SpriteFrame, sys, utils, _decorator } from 'cc';
import { Util } from '../Util';
const { ccclass, property } = _decorator;

@ccclass('UserData')
export class UserData {

    private static _userData: UserData;

    /**
     * 登录后获取的凭证
     */
    loginInfo: any = null;
    /**
     * 用户个人信息
     */
    userInfo: any = null;
    /**
     * 用户头像
     */
    userImg: SpriteFrame = null;
    /**
     * 今日是否分享
     */
    private _shared: boolean = false;
    set shared(value: boolean) {
        this._shared = value;
        sys.localStorage.setItem("shared", JSON.stringify(this._shared));
    }
    get shared() {
        return this._shared;
    }
    /**
     * 今日在线时长
     */
    private _onlineTimer: number = 0;
    set onlineTimer(value: number) {
        this._onlineTimer = value;
        sys.localStorage.setItem("onlineTimer", JSON.stringify(this.onlineTimer));
    }
    get onlineTimer() {
        return this._onlineTimer;
    }
    /**
     * 今日通关次数
     */
    private _passCount: number = 0;
    set passCount(value: number) {
        this._passCount = value;
        sys.localStorage.setItem("passCount", JSON.stringify(this.passCount));
    }
    get passCount() {
        return this._passCount;
    }

    constructor() {
        this.startOnlineTimer();
        let lastLoginData = sys.localStorage.getItem("lastLoginData");
        if (lastLoginData && Util.isNewDay(JSON.parse(lastLoginData))) {
            console.log("new day");
            sys.localStorage.setItem("lastLoginData", JSON.stringify(new Date()))
            this.shared = false;
            this.onlineTimer = 0;
            this.passCount = 0;
        } else {
            console.log("not new day");
            this.shared = sys.localStorage.getItem("shared") ? JSON.parse(sys.localStorage.getItem("shared")) : false;
            this.onlineTimer = sys.localStorage.getItem("onlineTimer") ? JSON.parse(sys.localStorage.getItem("onlineTimer")) : 0;
            this.passCount = sys.localStorage.getItem("passCount") ? JSON.parse(sys.localStorage.getItem("passCount")) : 0;
        }
    }

    public static getInstance() {
        if (!this._userData) {
            this._userData = new UserData();
        }
        return this._userData;
    }


    /**
     * 启动在线计时器
     */
    startOnlineTimer() {
        setInterval(() => {
            this.onlineTimer++;
        }, 1000);
    }
}


