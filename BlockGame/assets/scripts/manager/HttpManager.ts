import { _decorator } from 'cc';
import { AppConfig } from '../config/AppConfig';
import { ApiUrl, HttpConfig } from '../config/HttpConfig';
import { UserData } from '../data/UserData';
const { ccclass, property } = _decorator;

@ccclass('HttpManager')
export class HttpManager {

    /**
     * 请求超时时间
     */
    private static timeout: number = 5000;
    /**
     * 通用http请求方法
     * @param method 方式 get post
     * @param url 地址
     * @param params 参数
     * @param success 成功回调
     */
    private static httpRequest(method: string, url: string, params: object = {}, auth: boolean, success: Function, fail: Function) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                success(xhr.responseText);
            }
        };
        xhr.onerror = function (e) {
            console.log(e);
            fail();
        }
        if (method == "GET") {
            let dataStr = "";
            Object.keys(params).forEach(key => {
                dataStr += key + "=" + encodeURIComponent(params[key]) + "&";
            })
            if (dataStr) {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
                url = url + "?" + dataStr;
            }
            xhr.open("GET", url, true);
            xhr.timeout = this.timeout;
            xhr.send();
        } else {
            let data = JSON.stringify(params);
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            if (auth) {
                xhr.setRequestHeader("Authorization", "Bearer " + UserData.getInstance().loginInfo.access_token)
            }
            xhr.send(data);
        }

    }



    /**
     * 发送手机验证码
     * @param phoneNum 
     * @param success 
     * @param fail 
     */
    public static sendPhoneMsg(phoneNum: string, success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.SEND_MSG;
        let params = {
            mobile: phoneNum,
            sms_type: "login",
            game_id: AppConfig.game_id
        }
        this.httpRequest("POST", url, params, false, success, fail);
    }


    /**
     * 手机验证码登录
     * @param phone 手机号
     * @param code 验证码
     * @param success 
     * @param fail 
     */
    public static login(phone: string, code: string, success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.LOGIN;
        let params = {
            mobile: phone,
            sms_type: "login",
            game_id: "1",
            code: code
        }
        this.httpRequest("POST", url, params, false, success, fail);
    }


    /**
     * 获取用户信息
     * @param success 
     * @param fail 
     */
    public static getUserInfo(success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.USER_INFO;
        let params = {
            game_id: AppConfig.game_id
        }
        this.httpRequest("POST", url, params, true, success, fail);
    }


    /**
     * 通关时调用
     * @param level 当前关卡id
     * @param success 
     * @param fail 
     */
    public static passLevel(level: number, success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.LEVEL_PASS;
        let params = {
            game_id: AppConfig.game_id,
            barrier_id: level
        }
        this.httpRequest("POST", url, params, true, success, fail);
    }


    /**
     * 获取后台配置的广告列表
     * @param success 
     * @param fail 
     */
    public static getAdList(success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.AD_LIST;
        let params = {
            game_id: AppConfig.game_id
        }
        this.httpRequest("POST", url, params, true, success, fail);
    }


    /**
     * 获取后台配置的签到列表
     * @param success 
     * @param fail 
     */
    public static getSignList(success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.SIGN_LIST;
        let params = {
            game_id: AppConfig.game_id
        }
        this.httpRequest("POST", url, params, true, success, fail);
    }


    /**
     * 获取后台配置的抽奖列表
     * @param success 
     * @param fail 
     */
    public static getLotteryList(success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.LOTTERY_LIST;
        let params = {
            game_id: AppConfig.game_id
        }
        this.httpRequest("POST", url, params, true, success, fail);
    }


    /**
     * 获取后台配置的关卡列表
     * @param success 
     * @param fail 
     */
    public static getLevelList(success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.LEVEL_LIST;
        let params = {
            game_id: AppConfig.game_id
        }
        this.httpRequest("POST", url, params, true, success, fail);
    }


    /**
     * 获取任务列表
     * @param taskType 1-每日任务 2-成就任务
     * @param success 
     * @param fail 
     */
    public static getTaskList(taskType: number, success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.TASK_LIST;
        let params = {
            game_id: AppConfig.game_id,
            task_type_id: taskType
        }
        this.httpRequest("POST", url, params, true, success, fail);
    }


    /**
     * 获取其他游戏配置
     * @param success 
     * @param fail 
     */
    public static getGameConfig(success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.GAME_CONFIG;
        let params = {
            game_id: AppConfig.game_id
        }
        this.httpRequest("POST", url, params, true, success, fail);
    }


    /**
     * 签到
     * @param success 
     * @param fail 
     */
    public static sign(success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.CLICK_SIGN;
        let params = {
            game_id: AppConfig.game_id
        }
        this.httpRequest("POST", url, params, true, success, fail);
    }


    /**
     * 抽奖
     * @param success 
     * @param fail 
     */
    public static lottery(success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.CLICK_LOTTERY;
        let params = {
            game_id: AppConfig.game_id
        }
        this.httpRequest("POST", url, params, true, success, fail);
    }

    /**
     * 完成任务
     * @param taskId 任务id
     * @param success 
     * @param fail 
     */
    public static completeTask(taskId: number, success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + ApiUrl.COMPLETE_TASK;
        let params = {
            game_id: AppConfig.game_id,
            task_id: taskId
        }
        this.httpRequest("POST", url, params, true, success, fail);
    }

}


