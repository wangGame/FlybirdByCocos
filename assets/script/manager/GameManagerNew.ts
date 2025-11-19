import { _decorator, Component, find, instantiate, Label, Node, Prefab } from 'cc';
import { MoveManager } from './MoveManager';
import { PipMove } from '../component/PipMove';
import { GenPip } from '../component/GenPip';
import { Brid } from '../component/Brid';
import { ResUtils } from '../utils/ResUtils';
import { GameData } from '../data/GameData';
import { AudioPlayer } from '../component/AudioPlayer';
const { ccclass, property } = _decorator;

@ccclass('GameManagerNew')
export class GameManagerNew extends Component {
    @property(MoveManager)
    private moveManager:MoveManager
    
    @property(GenPip)
    private pipGen:GenPip

    @property(Brid)
    private brid:Brid

    @property(Label)
    private gameScore:Label
    private gameOverFlag

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
        let gameUi = find("Canvas/GameUI")
        gameUi.active = true
    }

    gameOver(){
        if(this.gameOverFlag){
            return
        }
        AudioPlayer.instance().playGameOver()
        this.gameOverFlag = true
        this.moveManager.canMove = false
        this.pipGen.disableSpawing()
        this.brid.gameOver()
        this.showGamePanel()
    }

    async showGamePanel(){
        //存储数据
        GameData.saveBestScoreNum()

        let gameOver = await ResUtils.resUtils.loadResAsset("prefab/GameOver",Prefab)
        let gameOverPanel = instantiate(gameOver)
        gameOverPanel.parent = this.node.parent
    }

    addScore(){
        GameData.addScore(1)
        this.gameScore.string = GameData.getScore().toString()
    }
}


