import { _decorator, CCInteger, Component, Node, sp, view } from 'cc';
import { MoveComponent } from './MoveComponent';
import { GameConfig } from '../data/GameConfig';
const { ccclass, property } = _decorator;

@ccclass('BgManager')
export class BgManager extends Component {
    @property([MoveComponent])
    private move:MoveComponent[] = []
    @property(CCInteger)
    private speed:number = 0
    private widthScreen:number
    private _isMove = false;

    start(){
        const visible = view.getVisibleSize();
        this.widthScreen = visible.x/2;
        console.log(this.widthScreen)
      
    }
    
    update(deltaTime: number) {
        console.log("-------------------")
        if(!this._isMove)return
        const moveDt = GameConfig.getinstance().speed * deltaTime
        let lastPositionX = 0
        for(let i = 0;i<this.move.length;i++){
            lastPositionX = this.move[i].moveComponent(moveDt) 
        }


         // 2. 检测循环（以往左滚动为例：背景 completely < -bgWidth）
        for (let i = 0; i < this.move.length; i++) {
            const node = this.move[i].node;
            const x = node.position.x;
            if (x <= -this.widthScreen-360) {
                // 找到最右边的背景
                let maxX = -99999999;
                for (let j = 0; j < this.move.length; j++) {
                    if (this.move[j].node.position.x > maxX) {
                        maxX = this.move[j].node.position.x;
                    }
                }

                // 把当前背景接到最右边
                node.setPosition(maxX + 720, node.position.y, node.position.z);
            }
        }
    }

    set isMove(_isMove:boolean){
        console.log(_isMove+"==================")
        this._isMove = _isMove
    }

    get isMove(){
        return this._isMove
    }
}


