import { _decorator, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {
    @property(Label)
    private scoreLabel:Label

    @property(Label)
    private bestLabel:Label
    start() {
        
    }

    show(scoreNum:number,bestNum:number){
        this.node.active = true
        this.scoreLabel.string  = scoreNum.toString()
        this.bestLabel.string = bestNum.toString()
    }

    resetGame(){
    
        director.loadScene(director.getScene().name);
    }
}


