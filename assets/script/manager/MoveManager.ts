import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveManager')
export class MoveManager extends Component {
    @property(MoveManager)
    private bgMoveManager:MoveManager
    @property(MoveManager)
    private bottomMoveManager:MoveManager
    private _canMove;
    set canMove(_canMove){
        this._canMove = _canMove
        this.bgMoveManager.canMove = _canMove
        this.bottomMoveManager.canMove = _canMove
    }
}