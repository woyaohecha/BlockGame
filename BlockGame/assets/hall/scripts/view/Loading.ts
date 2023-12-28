import { _decorator, Component, Node, director, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {

    onLoad() {
        let root2D = find("Root2D");
        let root3D = find("Root3D");
        director.addPersistRootNode(root2D);
        director.addPersistRootNode(root3D);
    }

    start() {
        director.loadScene("Hall");
    }
}


