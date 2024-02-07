import { _decorator, Component, Label, Node, tween, Vec2, Vec3, Tween } from 'cc';
import { GameData } from '../../data/GameData';
import { GridPanelLogic } from '../../gameLogic/GridPanelLogic';
import { NextPanelLogic } from '../../gameLogic/NextPanelLogic';
import { AdManager, AdType } from '../../manager/AdManager';
import { EventManager } from '../../manager/EventManager';
import { GamePage } from './GamePage';
const { ccclass, property } = _decorator;

@ccclass('PlayView')
export class PlayView extends Component {

    @property(Label)
    levelLabel: Label = null;

    @property(Label)
    targetLabel: Label = null;

    @property(Label)
    scoreLabel: Label = null;

    /**
     * 当前关卡
     */
    private _level: number = 0;
    set level(value: number) {
        this._level = value;
        this.levelLabel.string = `第${this.level}关`;
    }
    get level() {
        return this._level;
    }

    /**
     * 当前关卡目标
     */
    private _target: number = 0;
    set target(value: number) {
        this._target = value;
        this.targetLabel.string = `${this.target}`;
    }
    get target() {
        return this._target;
    }

    /**
     * 当前分数
     */
    private _score: number = 0;
    set score(value: number) {
        this._score = value;
        this.scoreLabel.string = `${this._score}`;
    }
    get score() {
        return this._score;
    }


    nextPanelLogic: NextPanelLogic = null;
    gridPanelLogic: GridPanelLogic = null;
    levelData: any = null;

    onLoad() {
        this.gridPanelLogic = this.node.getChildByName("GridPanel").getComponent(GridPanelLogic);
        this.nextPanelLogic = this.node.getChildByName("NextPanel").getComponent(NextPanelLogic);
        EventManager.getInstance().on("addScore", this.addScore, this);
    }


    initGamePage() {
        console.log("PlayView init");
        GameData.getUserLevel((level) => {
            this.level = level + 1;
            GameData.getLevelData(level, (leveData) => {
                this.levelData = leveData;
                this.target = leveData.pass_points;
            }, () => {

            })
        }, (e) => {

        })
        this.score = 0;
        this.gridPanelLogic.initGridPanel();
    }


    addScore(value: number) {
        this.score += value;
        Tween.stopAllByTarget(this.scoreLabel.node);
        this.scoreLabel.node.scale = new Vec3(1, 1, 1);
        tween(this.scoreLabel.node)
            .to(0.2, { scale: new Vec3(1.2, 1.2, 1) })
            .to(0.2, { scale: new Vec3(1, 1, 1) })
            .start();
        if (this.score >= this.target) {
            EventManager.getInstance().emit("gameSettle", true, this.levelData.pass_goldcoin);
        }
    }


    onBtnPause() {
        EventManager.getInstance().emit("gamePause");
    }

    onBtnFresh() {
        AdManager.getInstance().hideBanner();
        AdManager.getInstance().showAd(AdType.video, () => {

        }, () => {
            AdManager.getInstance().showAd(AdType.banner);
        }, () => {
            this.node.getChildByName("NextPanel").getComponent(NextPanelLogic).freshThreeBlock();
            AdManager.getInstance().showAd(AdType.banner);
        })
        // this.node.getChildByName("NextPanel").getComponent(NextPanelLogic).freshThreeBlock();
    }

    onDestroy() {
        EventManager.getInstance().off("addScore", this.addScore, this);
    }
}


