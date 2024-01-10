import { _decorator, Component, Node } from 'cc';
import { HttpManager } from '../manager/HttpManager';
import { UserData } from './UserData';
const { ccclass, property } = _decorator;

@ccclass('GameData')
export class GameData {

    /**
     * 获取关卡数据
     * @param success 返回关卡数据
     * @param fail 
     */
    public static getLevelData(level: number, success: Function, fail: Function) {
        HttpManager.getLevelList((res) => {
            let levelList = JSON.parse(res).data.list;
            let levelData = levelList[level];
            success(levelData);
        }, (e) => {
            console.log(e);
            fail();
        })
    }

    public static getGameConfig(success: Function, fail: Function) {
        HttpManager.getGameConfig((res) => {
            let gameConfig = JSON.parse(res).data;
            success(gameConfig);
        }, (e) => {
            console.error(e);
            fail();
        })
    }

    public static getUserLevel(success: Function, fail: Function) {
        HttpManager.getUserInfo((res) => {
            let userInfo = JSON.parse(res).data;
            let userLevel = Number(userInfo.barrier);
            success(userLevel);
        }, (e) => {
            console.error(e);
            fail();
        })
    }


}


