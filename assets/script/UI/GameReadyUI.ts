import { _decorator, Component, Input, input, Node } from 'cc';
import { GameManagerNew } from '../manager/GameManagerNew';
const { ccclass } = _decorator;

@ccclass('GameReadyUI')
export class GameReadyUI extends Component {
    start() {
        input.on(Input.EventType.TOUCH_START,this.startGame,this)
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START,this.startGame,this)
    }

    startGame(){
        GameManagerNew.instance.setCanMove(true)
        this.node.destroy()
    }
}


