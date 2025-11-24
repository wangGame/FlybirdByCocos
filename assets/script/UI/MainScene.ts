import { _decorator, Component, director, Node } from 'cc';
import FaderManager from '../view/FaderManager';
const { ccclass, property } = _decorator;

@ccclass('MainScene')
export class MainScene extends Component {
    startGame(){
        director.loadScene("Gamescene")

 
    }
}


