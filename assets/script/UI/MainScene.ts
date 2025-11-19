import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainScene')
export class MainScene extends Component {
    start() {

    }

    startGame(){
        director.loadScene("Gamescene")
    }
}


