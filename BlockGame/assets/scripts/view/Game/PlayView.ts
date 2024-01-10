import { _decorator, Component, Label, Node } from 'cc';
import { GameData } from '../../data/GameData';
import { GridPanelLogic } from '../../gameLogic/GridPanelLogic';
import { NextPanelLogic } from '../../gameLogic/NextPanelLogic';
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
        this.levelLabel.string = `第${this.level + 1}关`;
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

    onLoad() {
        this.gridPanelLogic = this.node.getChildByName("GridPanel").getComponent(GridPanelLogic);
        this.nextPanelLogic = this.node.getChildByName("NextPanel").getComponent(NextPanelLogic);
    }


    initGamePage() {
        console.log("PlayView init");
        GameData.getUserLevel((level) => {
            this.level = level;
            GameData.getLevelData(this.level, (leveData) => {
                this.target = leveData.pass_points;
            }, () => {

            })
        }, (e) => {

        })
        this.score = 0;
        this.gridPanelLogic.initGridPanel();
    }


    onBtnPause() {
        this.node.parent.getComponent(GamePage).onPause();
    }

    onBtnFresh() {
        this.node.getChildByName("NextPanel").getComponent(NextPanelLogic).freshThreeBlock();
    }
}


