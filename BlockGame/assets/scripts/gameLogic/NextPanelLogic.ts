import { _decorator, Component, Node, Vec3, find } from 'cc';
import { EventManager } from '../manager/EventManager';
import { Util } from '../Util';
import { GamePage } from '../view/Game/GamePage';
import { BlockLogic } from './BlockLogic';
import { BlockPool } from './BlockPool';
import { GridPanelLogic } from './GridPanelLogic';
const { ccclass, property } = _decorator;

@ccclass('NextPanelLogic')
export class NextPanelLogic extends Component {

    nextPanel: Node = null;
    gridPanelLogic: GridPanelLogic = null;

    private _blockPool: BlockPool = BlockPool.getInstance();

    onLoad() {
        this.nextPanel = this.node.getChildByName("Next");
        this.gridPanelLogic = this.node.parent.getChildByName("GridPanel").getComponent(GridPanelLogic);
        EventManager.getInstance().on("blockPlace", this.checkNextCanPlace, this);
    }

    /**
     * 初始化
     */
    initNextPanel() {
        console.log("init nextPanel");
        this.freshThreeBlock();
    }

    /**
     * 检查下方是否需要变色
     */
    checkNextCanPlace() {
        let grayCount = 0;
        let blockCount = 0;
        for (let i = 0; i < this.nextPanel.children.length; i++) {
            if (this.nextPanel.children[i].children[0]) {
                blockCount++;
                let blockLogic: BlockLogic = this.nextPanel.children[i].children[0].getComponent(BlockLogic);
                let canPlace = this.gridPanelLogic.findBlockEmpty(blockLogic);
                if (canPlace) {
                    blockLogic.setColor();
                } else {
                    blockLogic.setGray();
                    grayCount++;
                }
            }
            if (i == this.nextPanel.children.length - 1 && grayCount == blockCount && grayCount != 0) {
                this.scheduleOnce(() => {
                    this.node.parent.parent.getComponent(GamePage).onSettle(false);
                }, 1)
            }
        }
    }


    /**
     * 创建下方三个块
     */
    createThreeBlock() {
        console.log("NextPanelLogic createThreeBlock");
        let indexs: number[] = Util.getRandomNumsFromNToM(0, 29, 3);

        for (let i = 0; i < this.nextPanel.children.length; i++) {
            this._blockPool.getBlock(indexs[i], (block: Node) => {
                block.setParent(this.nextPanel.children[i]);
                block.setPosition(Vec3.ZERO);
                EventManager.getInstance().emit("blockPlace");
            })
        }
    }

    /**
     * 刷新下方三个块
     */
    freshThreeBlock() {
        console.log("NextPanelLogic freshThreeBlock");
        for (let child of this.nextPanel.children) {
            child.removeAllChildren();
        }
        this.createThreeBlock();
    }

    /**
     * 检查下方是否有方块
     * @returns 
     */
    checkEmpty() {
        for (let child of this.nextPanel.children) {
            if (child.children.length > 0) {
                return false;
            }
        }
        return true;
    }
}


