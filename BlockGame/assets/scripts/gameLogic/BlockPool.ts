import { _decorator, Component, Node, NodePool, instantiate, resources, Prefab, SpriteFrame } from 'cc';
import { ResConfig } from '../config/ResConfig';
import { Util } from '../Util';
import { BlockLogic } from './BlockLogic';
const { ccclass, property } = _decorator;

@ccclass('BlockPool')
export class BlockPool {
    private static _blockPool: BlockPool = null;

    public static getInstance() {
        if (!this._blockPool) {
            this._blockPool = new BlockPool();
        }
        return this._blockPool;
    }

    blockPool: Node[] = [];
    imgPool: SpriteFrame[] = [];


    /**
     * 创建一个block
     * @param index 要创建的block序号
     * @param success 
     */
    private creatBlock(index: number, success: Function) {
        resources.load(ResConfig.blockPath + index, (e, blockPrefab: Prefab) => {
            if (e) {
                console.error(e);
                return;
            }
            let block = instantiate(blockPrefab);
            block.addComponent(BlockLogic);
            this.blockPool[index] = block;
            success(block);
        })
    }

    /**
     * 获取一个block
     * @param success 返回block：Node 
     */
    getBlock(index: number, success?: Function) {
        if (this.blockPool[index] && this.blockPool[index].isValid) {
            this.setRandomBlockImg(this.blockPool[index]);
            success(this.blockPool[index]);
        } else {
            this.creatBlock(index, (block) => {
                this.setRandomBlockImg(block);
                // console.log("create index", index, block);
                success(block);
            })
        }
    }


    /**
     * 给block设置或随机一个颜色
     * @param block 
     * @param index 
     */
    setRandomBlockImg(block: Node, index?: number) {
        let imgIndex = (index && index >= 1 && index <= 6) ? index : Util.getRandomInt(1, 6);
        this.getImg(imgIndex, (img) => {
            block.getComponent(BlockLogic).setColor(img);
        })
    }


    /**
     * 获取一个颜色的sp
     * @param index 
     * @param success 
     */
    private loadImg(index: number, success: Function) {
        resources.load(`${ResConfig.blockImgPath}/${index}/spriteFrame`, (e, blockImg: SpriteFrame) => {
            if (e) {
                console.error(e);
                return;
            }
            this.imgPool[index] = blockImg;
            success(blockImg);
        })
    }


    /**
     * 获取一个颜色的sp
     * @param index img序号
     * @param success 
     */
    getImg(index: number, success?: Function) {
        if (this.imgPool[index]) {
            success(this.imgPool[index]);
        } else {
            this.loadImg(index, (img) => {
                success(img);
            })
        }
    }



    /**
     * 移除block
     * @param block 
     */
    removeBlock(block: Node) {
        block.removeFromParent();
        block.getComponent(BlockLogic).initBlock();
    }

    /**
     * 清空blockPool
     */
    clear() {
        for (let block of this.blockPool) {
            block.destroy();
        }
        this.blockPool = [];
    }
}


