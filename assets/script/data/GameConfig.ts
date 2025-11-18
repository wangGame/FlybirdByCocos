import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameConfig')
export class GameConfig extends Component {
 
 
   private static _config:GameConfig
   public speed = 200
   onLoad(){
       GameConfig._config = this
   }

   static getinstance(){
       return GameConfig._config
   }

 
}