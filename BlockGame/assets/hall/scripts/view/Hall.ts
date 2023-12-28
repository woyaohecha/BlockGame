import { _decorator, Component, Node } from 'cc';
import { TipsManager } from '../manager/TipsManager';
const { ccclass, property } = _decorator;

@ccclass('Hall')
export class Hall extends Component {

    msgManager: TipsManager;

    onLoad() {
        this.msgManager = TipsManager.getInstance();
    }

    onShowTips() {
        this.msgManager.showTips("这是tips消息提示");
    }

    onShowToast() {
        this.msgManager.showToast(
            {
                title: "ToastTitle",
                msg: "这是toast消息提示",
                btn: "close"
            }, null, true
        )
    }

    onShowLoading() {
        this.msgManager.showLoading("这是loading提示消息");
    }
}


