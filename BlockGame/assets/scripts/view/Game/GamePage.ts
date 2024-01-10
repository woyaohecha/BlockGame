import { _decorator, Component, Node, director } from 'cc';
import { GameData } from '../../data/GameData';
import { GridPanelLogic } from '../../gameLogic/GridPanelLogic';
import { HttpManager } from '../../manager/HttpManager';
import { TipsManager } from '../../manager/TipsManager';
import { PlayView } from './PlayView';
import { SettleView } from './SettleView';
const { ccclass, property } = _decorator;

export const enum View {
    PLAY = "Play",
    PAUSE = "Pause",
    SETTLE = "Settle"
}

@ccclass('GamePage')
export class GamePage extends Component {

    @property(Node)
    playView: Node = null;

    @property(Node)
    pauseView: Node = null;

    @property(Node)
    settleView: Node = null;

    gridPanelLogic: GridPanelLogic = null;

    onLoad() {
        this.gridPanelLogic = this.playView.getChildByName("GridPanel").getComponent(GridPanelLogic);
    }

    start() {
        this.onStart();
    }


    /**
     * 游戏开始
     */
    onStart() {
        console.log("gamePage onStart");
        this.playView.active = true;
        this.pauseView.active = false;
        this.settleView.active = false;

        this.playView.getComponent(PlayView).initGamePage();
    }


    /**
     * 复活
     */
    onRelive() {
        console.log("gamePage onRelive");
        this.gridPanelLogic.initGridPanel();
        this.playView.active = true;
        this.pauseView.active = false;
        this.settleView.active = false;
    }

    /**
     * 暂停
     */
    onPause() {
        console.log("gamePage onPause");
        this.pauseView.active = true;
    }


    /**
     * 继续游戏
     */
    onContinue() {
        console.log("gamePage onContinue");
        this.pauseView.active = false;
    }


    /**
     * 结算
     * @param value win-true lose-false
     * @param goldCount 获胜时的奖励
     */
    onSettle(value: boolean, goldCount?: number) {
        console.log("gamePage onSettle:", value);
        if (value) {
            TipsManager.getInstance().showLoading("结算中...");
            GameData.getUserLevel((level) => {
                HttpManager.passLevel(level, () => {
                    TipsManager.getInstance().hideLoading();
                    this.settleView.getComponent(SettleView).init(value, goldCount)
                    this.settleView.active = true;
                }, (e) => {
                    console.error(e);
                    TipsManager.getInstance().hideLoading();
                    this.settleView.active = true;
                })
            }, (e) => {
                console.error(e);
                TipsManager.getInstance().hideLoading();
                this.settleView.active = true;
            })

        } else {
            this.settleView.getComponent(SettleView).init(value)
            this.settleView.active = true;
        }

    }


    /**
     * 退出游戏
     */
    onQuit() {
        console.log("gamePage onQuit");
        director.loadScene("Home");
    }
}


