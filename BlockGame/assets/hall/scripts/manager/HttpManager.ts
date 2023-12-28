import { _decorator } from 'cc';
import { HttpConfig } from '../config/HttpConfig';
const { ccclass, property } = _decorator;

@ccclass('HttpManager')
export class HttpManager {

    /**
     * 请求超时时间
     */
    private static timeout: number = 5000;

    /**
     * 通用http请求方法
     * @param method 方式
     * @param url 地址
     * @param params 参数
     * @param success 成功回调
     */
    private static httpRequest(method: string, url: string, params: object = {}, success: Function, fail: Function) {
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
        }

    }


    /**
     * 登录
     * @param apiUrl 接口
     * @param params 参数
     * @param success 成功回调
     * @param fail 失败回调
     */
    public static login(apiUrl: string, params: object = {}, success: Function, fail: Function) {
        let url = HttpConfig.httpUrl + apiUrl
        this.httpRequest("GET", url, params, success, fail);
    }
}


