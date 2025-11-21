import { _decorator, Component, instantiate, math, Node, Prefab, resources, view } from 'cc';
import { PipMove } from './PipMove';
const { ccclass, property } = _decorator;

@ccclass('GenPip')
export class GenPip extends Component {
    @property(Prefab)
    private pipPrefab:Node
    private genDistanceTime = 3
    private timer = 3
    private _isSpawing:boolean = false

    start(){
        let screenWidthHalf = view.getVisibleSize().width/2.0
        this.node.setPosition(screenWidthHalf+30,0,0)
    }

    update(deltaTime: number) {
        if(this._isSpawing){
            this.timer += deltaTime
            if(this.timer > this.genDistanceTime){
                this.timer = 0
                this.genPip()
            }
        }
    }

    genPip(){
        let pip = instantiate(this.pipPrefab)
        pip.parent = this.node
        pip.setPosition(0,math.randomRangeInt(-240,240))   
    }

    enableSpawing(){
        this._isSpawing = true
    }

    disableSpawing(){
        this._isSpawing = false
        this.stopAll()
    }

    private stopAll(){
        this.node.children.forEach(element=>{
            let pipMove = element.getComponent(PipMove)
            pipMove.isStop = true
        })
    }
}


