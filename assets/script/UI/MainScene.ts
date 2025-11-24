import { _decorator, Component, director, Node } from 'cc';
import { FadeManager } from '../utils/FadeManager';
const { ccclass, property } = _decorator;

@ccclass('MainScene')
export class MainScene extends Component {
    startGame(){
        director.loadScene("Gamescene")

        FadeManager.instance.fadeOut(6)
    }
}


