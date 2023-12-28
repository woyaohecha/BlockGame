import { _decorator } from 'cc';
const { ccclass, property } = _decorator;


/**
 * 网络接口相关url配置
 */
@ccclass('HttpConfig')
export class HttpConfig {
    /**
     * 接口地址
     */
    public static readonly httpUrl: string = "";
    /**
     * bundle下载地址
     */
    public static readonly bundleUrl: string = "";
    /**
     * 相关远程配置地址
     */
    public static readonly gameConfigUrl: string = "";
}


