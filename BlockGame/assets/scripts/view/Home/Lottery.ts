import { _decorator, Component, Node, Label, math, Vec3, tween } from 'cc';
import { HttpManager } from '../../manager/HttpManager';
import { TipsManager } from '../../manager/TipsManager';
const { ccclass, property } = _decorator;

@ccclass('Lottery')
export class Lottery extends Component {
    @property(Node)
    itemsPanel: Node = null;

    lotteryList: any[] = null;

    onEnable() {
        this.initPan();
        HttpManager.getLotteryList((res) => {
            let data = JSON.parse(res).data.list;
            console.log(data);
            this.lotteryList = data;
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].reward_value == 0) {
                        this.itemsPanel.children[i].getChildByName('Name').getComponent(Label).string = `谢谢惠顾`;
                        this.itemsPanel.children[i].getChildByName('Icon').active = false;
                    } else {
                        this.itemsPanel.children[i].getChildByName('Name').getComponent(Label).string = `红包金币×${Math.floor(data[i].reward_value)}`;
                        this.itemsPanel.children[i].getChildByName('Icon').active = true;
                    }

                }
            }
        }, (e) => {
            console.error(e);
        })
    }


    /**
     * 初始化转盘，角度归零
     */
    initPan() {
        this.itemsPanel.parent.setRotationFromEuler(new Vec3(0, 0, 0));
    }

    lotterying: boolean = false;
    onBtnLottery() {
        if (this.lotterying) {
            return;
        }
        this.lotterying = true;
        HttpManager.lottery((res) => {
            let data = JSON.parse(res).data;
            console.log(data);
            let index = this.lotteryList.findIndex((item) => {
                return item.id == data.raffle_id;
            })
            this.startPan(index);
        }, (e) => {
            console.error("抽奖失败", e);
        })
    }

    startPan(index) {
        let pan = this.itemsPanel.parent;
        let lastAngle = pan.eulerAngles.z;
        let angle = -360 * 3 - (360 - 45 * index) + (Math.abs(lastAngle) % 360);
        console.log(angle);
        tween(pan)
            .by(2, { eulerAngles: new Vec3(0, 0, angle) }, { easing: "quadOut" })
            .call(() => {
                this.showResultTips(index);
            })
            .start()
    }


    showResultTips(index) {
        let msg: string = "";
        if (this.lotteryList[index].reward_value == 0) {
            msg = `谢谢惠顾`;
        } else {
            msg = `恭喜获得红包金币×${Math.floor(this.lotteryList[index].reward_value)}`;
        }
        TipsManager.getInstance().showTips(msg);
        this.scheduleOnce(() => {
            this.lotterying = false;
        }, 1)
    }



}


