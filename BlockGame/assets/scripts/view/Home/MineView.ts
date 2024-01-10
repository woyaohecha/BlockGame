import { _decorator, Component, Node, Sprite, Label, SpriteFrame, assetManager, ImageAsset, Texture2D, resources, director } from 'cc';
import { ResConfig } from '../../config/ResConfig';
import { UserData } from '../../data/UserData';
import { HttpManager } from '../../manager/HttpManager';
import { Util } from '../../Util';
const { ccclass, property } = _decorator;

@ccclass('MineView')
export class MineView extends Component {

    @property(Sprite)
    userImgSp: Sprite = null;

    @property(Label)
    userNameLabel: Label = null;

    @property(Label)
    userIdLabel: Label = null;

    @property(Label)
    balanceLabel: Label = null;

    onEnable() {
        HttpManager.getUserInfo((res) => {
            let data = JSON.parse(res).data;
            console.log("---获取用户信息成功", data);
            this.init(data);
        }, () => {
            console.error("---获取用户信息失败");
        })
    }

    start() {

    }

    init(data) {
        this.userNameLabel.string = data.nickname;
        this.userIdLabel.string = "ID:" + Util.padZero(data.user_id, 6);
        this.balanceLabel.string = data.goldcoin;
        if (UserData.getInstance().userImg) {
            this.userImgSp.spriteFrame = UserData.getInstance().userImg;
        } else {
            this.loadUserImg(data.avatar);
        }
    }

    /**
     * 加载头像
     * @param imgUrl 如果头像地址不存在，则使用默认头像
     */
    loadUserImg(imgUrl) {
        if (!imgUrl || imgUrl == "") {
            resources.load(ResConfig.defaultImgPath, SpriteFrame, (e, asset: SpriteFrame) => {
                if (e) {
                    console.log(e);
                    return;
                }
                this.userImgSp.spriteFrame = asset;
                UserData.getInstance().userImg = asset;
            })
        } else {
            assetManager.loadRemote(imgUrl, { ext: '.jpg' }, (e, asset: ImageAsset) => {
                if (e) {
                    console.log(e);
                    return;
                }
                // console.log("加载头像成功:", asset, typeof (asset));
                let sp = new SpriteFrame();
                let tex = new Texture2D();
                tex.image = asset;
                sp.texture = tex;
                this.userImgSp.spriteFrame = sp;
                UserData.getInstance().userImg = sp;
            })
        }
    }


    /**
     * 提现
     */
    onBtnCashOut() {

    }


    /**
     * 分享
     */
    onBtnShare() {

    }


    /**
     * 提现记录
     */
    onBtnCashRecord() {

    }


    /**
     * 联系客服
     */
    onBtnCustomer() {

    }


    /**
     * 查看用户协议
     */
    onBtnUserAgreement() {

    }


    /**
     * 查看隐私政策
     */
    onBtnPrivacy() {

    }


    /**
     * 关于我们
     */
    onBtnAboutUs() {

    }


    /**
     * 注销账号
     */
    onBtnQuit() {
        director.loadScene("Loading");
    }
}


