import { _decorator, Component, floatToHalf, Node, sp, Sprite, SpriteFrame, UITransform, view } from 'cc';
import { ResUtils } from '../utils/ResUtils';
const { ccclass, property } = _decorator;

@ccclass('LoadingBg')
export class LoadingBg extends Component {
    async start() {
        // 横屏的时候， 几个
        let width = view.getVisibleSize().width
        console.log(view.getVisibleSize())

        console.log(view.getDesignResolutionSize())
        let num = Math.ceil(view.getVisibleSize().width/720.0)

        console.log(num+"  ==个数===========尺寸==  "+width)
        for(let i=0;i<num;i++){
            let node = await this.createBgNode()
            node.parent = this.node
            let offX = width / 2.0
            if(num == 1){
                offX = 0
            }
            node.setPosition(i*720 - offX,0)
        }
        //宽度可以多方几个，  高度通过缩放解决
        let height = view.getVisibleSize().height
        let scale = height / 1500
        if(scale>1.0){
            this.node.setScale(scale,scale,scale)
        }
    }

    public async createBgNode():Promise<Node>{
        let node = new Node("Bg")
        let spriteFrame = await ResUtils.resUtils.loadResAsset("img/game_bg/spriteFrame",SpriteFrame)
        let sprite = node.addComponent(Sprite)
        sprite.spriteFrame = spriteFrame
        sprite.sizeMode = Sprite.SizeMode.CUSTOM
        return node
    }

    // 选择宽高可以得到我的要求
    // initViewInfo(){
    //     //根据屏幕分辨率 设置view的适配方式
    // }

    //如果横竖两套布局

 
}


