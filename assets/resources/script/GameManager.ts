import { _decorator, CCInteger, Component, Label, Node } from 'cc';
import { GameState } from './enum/GameState';
import { Brid } from './Brid';
import { BgMove } from './BgMove';
import { GenPip } from './GenPip';
import { GameData } from './GameData';
import { GameOverUI } from './GameOverUI';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(CCInteger)
    moveSpeed:number
    private static _instance:GameManager = null
    public static inst(){
        return this._instance
    }

    private currentState = GameState.READY
    @property(Brid)
    private bird:Brid
    @property(BgMove)
    private bgMoving:BgMove = null
    @property(BgMove)
    private landMoving:BgMove = null
    @property(GenPip)
    private genPip:GenPip
    @property(Node)
    private gameReadyUI:Node
    @property(Label)
    private scoreLabel:Label
    @property(Node)
    private gameUI:Node
    @property(Node)
    private gameOver:Node

    protected onLoad(): void {
        GameManager._instance = this
    }

    start() {
        this.transitionToReadyState()
    }

    transitionToReadyState(){
        this.gameOver.active = false
        this.currentState = GameState.READY
        this.bird.disableConctrl()
        this.bgMoving.disableMove()
        this.landMoving.disableMove()
        this.genPip.disableSpawing()
        this.gameReadyUI.active = true
        this.gameUI.active = false
    }

    transitionToGamingState(){
        this.currentState = GameState.GAMEING
        this.bird.enableConctrl()
        this.bgMoving.enableMove()
        this.landMoving.enableMove()
        this.genPip.enableSpawing()
        this.gameReadyUI.active = false
        this.gameUI.active = true
    }

    transitionToGameOver(){
        this.currentState = GameState.GAMEOVER
        this.bird.disableConctrl()
        this.bgMoving.disableMove()
        this.landMoving.disableMove()
        this.genPip.disableSpawing()
        this.gameReadyUI.active = false
        this.gameUI.active = false
        this.gameOver.active = true
        this.gameOver.getComponent(GameOverUI).show(GameData.getScore(),GameData.getBestScoreNum())
        GameData.saveBestScoreNum()
    }

    addScore(count:number = 1){
        GameData.addScore(count)
        this.scoreLabel.string = GameData.getScore()+""
    }

}


