import { _decorator, Component, Node } from 'cc';
import { HttpManager } from '../manager/HttpManager';
import { UserData } from './UserData';
const { ccclass, property } = _decorator;

@ccclass('GameData')
export class GameData {


    private static _levelList: any[] = [];

    /**
     * 获取关卡数据
     * @param success 返回关卡数据
     * @param fail 
     */
    public static getLevelData(level: number, success: Function, fail: Function) {
        console.log("level", level);
        let levelData;
        if (this._levelList.length == 0) {
            HttpManager.getLevelList((res) => {
                this._levelList = JSON.parse(res).data.list;
                this.getLevelData(level, success, fail);
            }, (e) => {
                console.log(e);
                fail();
            })
        } else {
            if (level >= this._levelList.length) {
                levelData = this._levelList[level % this._levelList.length]
            } else {
                levelData = this._levelList[level];
            }
            success(levelData);
        }

    }

    private static _gameConfig: any = null;
    public static getGameConfig(success: Function, fail: Function) {
        if (!this._gameConfig) {
            HttpManager.getGameConfig((res) => {
                this._gameConfig = JSON.parse(res).data.list;
                console.log("_gameConfig:", this._gameConfig)
                this.getGameConfig(success, fail);
            }, (e) => {
                console.error(e);
                fail();
            })
        } else {
            success(this._gameConfig);
        }
    }

    public static getUserLevel(success: Function, fail: Function) {
        HttpManager.getUserInfo((res) => {
            let userInfo = JSON.parse(res).data;
            let level = Number(userInfo.barrier);
            success(level);
        }, (e) => {
            console.error(e);
            fail();
        })
    }


}


