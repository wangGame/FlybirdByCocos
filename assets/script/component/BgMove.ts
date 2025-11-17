import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgMove')
export class BgMove extends Component {
    @property(Node)
    targetObj1:Node = null
    @property(Node)
    targetObj2:Node = null
    @property(Node)
    targetObj3:Node = null
    @property
    moveSpeed:number = 100
    _isMove:boolean = false
    
    update(deltaTime: number) {
        if(this._isMove){
            const moveDistance = this.moveSpeed * deltaTime
            let p1 = this.targetObj1.getPosition()
            this.targetObj1.setPosition(p1.x - moveDistance,p1.y)

            let p2 = this.targetObj2.getPosition()
            this.targetObj2.setPosition(p2.x - moveDistance,p2.y)
            
            if(p1.x < -730){
                p2 = this.targetObj2.getPosition()
                this.targetObj1.setPosition(p2.x+730,p2.y)
            }
            
            if(p2.x < -730){
                p1 = this.targetObj1.getPosition()
                this.targetObj2.setPosition(p1.x+730,p1.y)
            }
        }
    }

    set move(isMove){
        this._isMove =  isMove
    }
    
    public disableMove(){
        this._isMove = false
    }

    public enableMove(){
        this._isMove= true
    }


}


