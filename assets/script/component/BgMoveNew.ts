import { _decorator, Component, instantiate, Node, Prefab, UITransform, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgMoveNew')
export class BgMoveNew extends Component {
    @property(Prefab)
    private bgPrefab:Prefab

    start() {
        const screenW = view.getVisibleSize().x;
    

        // 计算需要多少张背景
        const count = Math.ceil(screenW / 720);

        // 第一个背景用当前节点
        let lastX = 0;

        for (let i = 0; i < count; i++) {
            let bg: Node = instantiate(this.bgPrefab);
            this.node.addChild(bg);    
            bg.setPosition(720 * i, 0, 0);
        }

        console.log(`屏幕宽${screenW}，背景宽${bgW}，补充 ${count} 张背景`);
    }

    update(deltaTime: number) {
        
    }
}


