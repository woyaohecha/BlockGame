import { _decorator, Component, Node, EditBox, Label } from 'cc';
import { UserData } from '../../data/UserData';
import { HttpManager } from '../../manager/HttpManager';
import { TipsManager } from '../../manager/TipsManager';
import { UILayer, UIManager } from '../../manager/UIManager';
const { ccclass, property } = _decorator;

@ccclass('AccountInfoLayer')
export class AccountInfoLayer extends Component {
    @property(EditBox)
    accountEdit: EditBox = null;

    @property(EditBox)
    nameEdit: EditBox = null;

    @property(EditBox)
    passwordEdit: EditBox = null;

    @property(Node)
    boxPanel: Node = null;

    private _account: string = "";
    private _username: string = "";
    private _password: string = "";

    onEnable() {
        for (let box of this.boxPanel.children) {
            box.getChildByName("Value").getComponent(Label).string = ``;
        }
        for (let i = 0; i < this.boxPanel.children.length; i++) {
            this.boxPanel.children[i].getChildByName("Value").getComponent(Label).string = ``;
        }
        this.accountEdit.string = "";
        this.nameEdit.string = "";
        this.passwordEdit.string = "";
        this._account = "";
        this._username = "";
        this._password = "";
    }




    onAccountEditEnd(editBox: EditBox) {
        let str = editBox.string;
        this._account = str;
    }

    onNameEditEnd(editBox: EditBox) {
        let str = editBox.string;
        this._username = str;
    }

    onPasswordEditChange(editBox) {
        let str = editBox;
        if (str.length > 0) {
            for (let i = 0; i < this.boxPanel.children.length; i++) {
                this.boxPanel.children[i].getChildByName("Value").getComponent(Label).string = str[i] ? "*" : null;
            }
        } else {
            for (let i = 0; i < this.boxPanel.children.length; i++) {
                this.boxPanel.children[i].getChildByName("Value").getComponent(Label).string = ``;
            }
        }
        this._password = str;
    }

    onBtnSubmit() {
        if (this._account.length == 0) {
            TipsManager.getInstance().showTips("请输入支付宝账号");
            return;
        }
        if (this._username.length == 0) {
            TipsManager.getInstance().showTips("请输入账户名");
            return;
        }
        if (this._password.length < 6) {
            TipsManager.getInstance().showTips("请输入密码");
            return;
        }
        TipsManager.getInstance().showLoading("请等待...");
        console.log("提现申请", UserData.getInstance().selectCashId, this._account, this._username, this._password);
        HttpManager.postCashOut(UserData.getInstance().selectCashId, this._account, this._username, this._password, (res) => {
            TipsManager.getInstance().hideLoading();
            TipsManager.getInstance().showTips(JSON.parse(res).msg);
            UIManager.getInstance().hideUI(UILayer.ACCOUNT_INFO);
        }, (e) => {
            TipsManager.getInstance().hideLoading();
            // TipsManager.getInstance().showTips(`提现申请失败${e ? e : null}`);
        })

    }

    onBtnClose() {
        UIManager.getInstance().hideUI(UILayer.ACCOUNT_INFO);
    }
}


