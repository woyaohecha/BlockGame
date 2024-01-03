import { _decorator, Component, Node, assetManager, resources, Prefab, Root, instantiate, Label } from 'cc';
import { ResConfig } from '../../config/ResConfig';
import { UserData } from '../../data/UserData';
import { HttpManager } from '../../manager/HttpManager';
import { TaskItem } from './TaskItem';
const { ccclass, property } = _decorator;

@ccclass('Task')
export class Task extends Component {

    @property(Node)
    dailyPanel: Node = null;

    @property(Node)
    achievementPanel: Node = null;

    /**
     * 每次打开任务列表，刷新任务
     */
    onEnable() {
        HttpManager.getTaskList(1, (res) => {
            let data = JSON.parse(res).data.list;
            console.log(data);
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    this.createTask(data[i], this.dailyPanel);
                }
            }
        }, (e) => {
            console.error(e);
        })

        HttpManager.getTaskList(2, (res) => {
            let data = JSON.parse(res).data.list;
            console.log(data);
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    this.createTask(data[i], this.achievementPanel);
                }
            }
        }, (e) => {
            console.error(e);
        })
    }

    /**
     * 创建任务
     * @param taskData 任务信息
     * @param parent 任务挂载的父节点
     */
    createTask(taskData: any, parent: Node) {
        resources.load(ResConfig.taskPrefabPath, (e, taskPrefab: Prefab) => {
            if (e) {
                console.log(e);
                return;
            }
            let task = instantiate(taskPrefab);
            task.getComponent(TaskItem).init(taskData);
            task.setParent(parent);
        })
    }


    onDisable() {
        this.dailyPanel.removeAllChildren();
        this.achievementPanel.removeAllChildren();
    }
}


