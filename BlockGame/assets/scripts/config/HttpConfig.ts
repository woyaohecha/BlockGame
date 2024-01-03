import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

export const enum ApiUrl {
    /**
     * 发送短信
     */
    SEND_MSG = "sms/send",
    /**
     * 登录
     */
    LOGIN = "mobile_login",
    /**
     * 获取用户信息
     */
    USER_INFO = "userinfo",
    /**
     * 通关成功
     */
    LEVEL_PASS = "clearance",
    /**
     * 广告列表
     */
    AD_LIST = "ad/list",
    /**
     * 签到列表
     */
    SIGN_LIST = "game/signup",
    /**
     * 抽奖列表
     */
    LOTTERY_LIST = "game/raffle",
    /**
     * 关卡列表
     */
    LEVEL_LIST = "game/barrier",
    /**
     * 系统配置
     */
    GAME_CONFIG = "game/config",
    /**
     * 任务列表
     */
    TASK_LIST = "job/list",
    /**
     * 点击签到
     */
    CLICK_SIGN = "clickCheck",
    /**
     * 点击抽奖
     */
    CLICK_LOTTERY = "raffle",
    /**
     * 完成任务
     */
    COMPLETE_TASK = ""
}

/**
 * 网络接口相关url配置
 */
@ccclass('HttpConfig')
export class HttpConfig {
    /**
     * 接口地址
     */
    public static readonly httpUrl: string = "http://ceshi.api.mosttop.top/api/";
    /**
     * bundle下载地址
     */
    public static readonly bundleUrl: string = "";
    /**
     * 相关远程配置地址
     */
    public static readonly gameConfigUrl: string = "";
}


