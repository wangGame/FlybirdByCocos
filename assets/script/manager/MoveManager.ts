import { _decorator, Component, Node } from 'cc';
import { BgManager } from '../component/BgManager';
const { ccclass, property } = _decorator;

@ccclass('MoveManager')
export class MoveManager extends Component {
    @property(BgManager)
    private bgMoveManager:BgManager
    @property(BgManager)
    private bottomMoveManager:BgManager

    set canMove(_canMove){
        this.bgMoveManager.isMove = _canMove
        this.bottomMoveManager.isMove = _canMove
    }
}