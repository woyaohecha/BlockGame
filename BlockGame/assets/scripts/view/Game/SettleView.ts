import { _decorator, Component, Node, Label, game, director } from 'cc';
import { GamePage } from './GamePage';
const { ccclass, property } = _decorator;

@ccclass('SettleView')
export class SettleView extends Component {

    @property(Label)
    goldCountLabel: Label = null;

    @property(Node)
    doubleBtn: Node = null;


    init(value: boolean, goldCount?: number) {
        this.node.getChildByName("Win").active = value;
        this.node.getChildByName("Lose").active = !value;
        this.goldCountLabel.string = `${goldCount ? goldCount : 0}`;
        this.doubleBtn.active = true;
    }

    onBtnDouble() {
        this.doubleBtn.active = false;
    }

    onBtnBack() {
        this.node.parent.getComponent(GamePage).onQuit();
    }

    onBtnContinue() {
        this.node.parent.getComponent(GamePage).onStart();
    }


    onBtnRelive() {
        this.node.parent.getComponent(GamePage).onRelive();
    }

    onBtnRetry() {
        this.node.parent.getComponent(GamePage).onStart();
    }
}


