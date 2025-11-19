import { _decorator, Component, director, Label, Node, Sprite, SpriteFrame, UITransform } from 'cc';
import { GameData } from '../data/GameData';
import { ResUtils } from '../utils/ResUtils';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {
    @property(Label)
    private scoreLabel:Label

    @property(Label)
    private bestLabel:Label

    @property(Sprite)
    private huiZ:Sprite

    protected start(): void {
       this.show(GameData.getScore(), GameData.getBestScoreNum())
    }

    show(scoreNum:number,bestNum:number){
        this.node.active = true
        this.scoreLabel.string  = scoreNum.toString()
        this.bestLabel.string = bestNum.toString()
        this.showHuiZhang(scoreNum)
    }

    async showHuiZhang(currentScore){
        let hzPath = "img/game_medal_3/spriteFrame"
        if(currentScore > 20){
            hzPath = "img/game_medal_3/spriteFrame"
        }else if(currentScore >40){
            hzPath = "img/game_medal_3/spriteFrame"
        }else{
            hzPath = "img/game_medal_3/spriteFrame"
        }
        let sprite = this.huiZ.getComponent(Sprite)
        sprite.spriteFrame = await ResUtils.resUtils.loadResAsset(hzPath,SpriteFrame)
        let uiTransform = this.huiZ.getComponent(UITransform)
        uiTransform.width = 44
        uiTransform.height = 44
    }

    resetGame(){
        director.loadScene(director.getScene().name);
    }
}


