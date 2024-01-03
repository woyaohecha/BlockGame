import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

export const enum LayerType {
    HOME = "Home",
    MINE = "Mine",
    TASK = "Task",
    SIGN = "Sign",
    LOTTERY = "Lottery",
}

@ccclass('Home')
export class Home extends Component {

    @property(Node)
    homeLayer: Node = null;

    @property(Node)
    mineLayer: Node = null;

    @property(Node)
    TaskLayer: Node = null;

    @property(Node)
    signLayer: Node = null;

    @property(Node)
    lotteryLayer: Node = null;

    onLoad() {
        this.initHome();
    }

    start() {

    }


    initHome() {
        this.openLayer(null, LayerType.HOME);
    }


    openLayer(e, layerType: LayerType) {
        this.homeLayer.active = layerType == LayerType.HOME;
        this.mineLayer.active = layerType == LayerType.MINE;
        this.TaskLayer.active = layerType == LayerType.TASK;
        this.signLayer.active = layerType == LayerType.SIGN;
        this.lotteryLayer.active = layerType == LayerType.LOTTERY;
    }

    closeLayer() {
        this.initHome();
    }


    onBtnStart() {
        director.loadScene("Game");
    }
}


