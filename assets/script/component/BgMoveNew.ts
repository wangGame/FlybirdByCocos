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

    
    }

    update(deltaTime: number) {
        
    }
}


