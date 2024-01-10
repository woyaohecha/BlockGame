import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ResConfig')
export class ResConfig {

    /**
     * 音效资源path
     */
    public static readonly audioPath = {
        bgm_1: "audio/bgm_1",
        bgm_2: "audio/bgm_2",
        bgm_3: "audio/bgm_3",
        click: "audio/click",
        win: "audio/win",
        lose: "audio/lose"
    }

    /**
     * 特效预制体path
     */
    public static readonly effectPath = {
        click: "effect/click",
        boom: "effect/boom",
        win: "effect/win",
        lose: "effect/lose"
    }

    /**
     * 通用消息弹窗预制体path
     */
    public static readonly msgPath = {
        tips: "msg/Tips",
        toast: "msg/Toast",
        loading: "msg/Loading"
    }

    public static readonly defaultImgPath = "img/UserImg/spriteFrame";

    public static readonly taskPrefabPath = "prefab/item/TaskItem"

    public static readonly signPrefabPath = "prefab/item/SignItem"

    public static readonly blockPath = "prefab/blockType/Block_"

    public static readonly blockImgPath = "blockImg";

    public static readonly gridPath = "prefab/item/GridItem";

    public static readonly ABPath = {

    }
}


