import { _decorator, Component, Game, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameConfig')
export class GameConfig extends Component {
    private static _config:GameConfig

    onLoad(){
        GameConfig._config = this
    }

    static get instance(){
        return GameConfig._config
    }

    public speed = 200
}


