import { _decorator, Component, Node } from 'cc';
import { MoveManager } from './MoveManager';
import { PipMove } from '../component/PipMove';
import { GenPip } from '../component/GenPip';
import { Brid } from '../component/Brid';
const { ccclass, property } = _decorator;

@ccclass('GameManagerNew')
export class GameManagerNew extends Component {
    @property(MoveManager)
    private moveManager:MoveManager
    
    @property(GenPip)
    private pipGen:GenPip

    @property(Brid)
    private brid:Brid

    private static _instance:GameManagerNew
    protected onLoad(): void {
        GameManagerNew._instance = this    
    }
    
    start() {
        this.moveManager.canMove = false
        this.pipGen.disableSpawing()
        this.brid.disableConctrl()
    }

    static get instance(){
        return GameManagerNew._instance
    }

    setCanMove(flag:boolean){
        this.moveManager.canMove = flag
        this.pipGen.enableSpawing()
        this.brid.enableConctrl()
    }

    gameOver(){

    }

    addScore(){
        
    }
}


