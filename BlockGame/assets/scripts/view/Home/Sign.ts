import { _decorator, Component, Node, Prefab, instantiate, resources } from 'cc';
import { ResConfig } from '../../config/ResConfig';
import { HttpManager } from '../../manager/HttpManager';
import { SignItem } from './SignItem';
const { ccclass, property } = _decorator;

@ccclass('Sign')
export class Sign extends Component {
    @property(Node)
    panel: Node = null;

    /**
     * 每次打开签到列表，刷新签到
     */
    onEnable() {
        HttpManager.getSignList((res) => {
            let data = JSON.parse(res).data.list;
            console.log(data);
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    this.createSign(data[i], this.panel);
                }
            }
        }, (e) => {
            console.error(e);
        })
    }

    /**
     * 创建签到
     * @param signData 签到信息
     * @param parent 签到挂载的父节点
     */
    createSign(signData: any, parent: Node) {
        resources.load(ResConfig.signPrefabPath, (e, signPrefab: Prefab) => {
            if (e) {
                console.log(e);
                return;
            }
            let signItem = instantiate(signPrefab);
            signItem.getComponent(SignItem).init(signData);
            signItem.setParent(parent);
        })

    }


    onDisable() {
        this.panel.removeAllChildren();
    }
}


