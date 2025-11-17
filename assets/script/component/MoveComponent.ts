import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveComponent')
export class MoveComponent extends Component {
    moveComponent(dt: number){
        let pos = this.node.getPosition().clone()
        pos.x -= dt
        this.node.setPosition(pos)    
        return pos.x
    }
}


