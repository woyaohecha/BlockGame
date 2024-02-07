import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CashRecordItem')
export class CashRecordItem extends Component {

    init(data: any) {
        let toLabel = this.node.getChildByName("To").getChildByName("Value").getComponent(Label);
        let goldLabel = this.node.getChildByName("Gold").getChildByName("Value").getComponent(Label);
        let timeLabel = this.node.getChildByName("Time").getChildByName("Value").getComponent(Label);
        let reasonLabel = this.node.getChildByName("Reason").getChildByName("Value").getComponent(Label);
        let success = this.node.getChildByName("Result").getChildByName("Success");
        let fail = this.node.getChildByName("Result").getChildByName("Fail");
        let wait = this.node.getChildByName("Result").getChildByName("Wait");
        let moneyLabel = this.node.getChildByName("Result").getChildByName("Value").getComponent(Label);

        toLabel.string = "支付宝";
        goldLabel.string = data.species + "金币";
        timeLabel.string = data.createtime;
        reasonLabel.string = data.review_remarks ? data.review_remarks : "正在审核中...";
        success.active = data.status == "1";
        fail.active = data.status == "2";
        wait.active = data.status == "0";
        moneyLabel.string = data.money + "元";
    }
}


