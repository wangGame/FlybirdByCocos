import { _decorator, Component, Node, screen, Screen, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipMove')
export class PipMove extends Component {
    private _isStop:boolean = false
    protected update(dt: number): void {
        if(this._isStop)return
        this.node.setPosition(this.node.getPosition().x - 100*dt,this.node.getPosition().y)
        if(this.node.worldPosition.x < -screen.windowSize.width){
            this.node.destroy()
        }
    }

    set isStop(isStop){
        this._isStop = isStop
    }
    
}