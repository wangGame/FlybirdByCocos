import { _decorator, Component, Node } from 'cc';

export class GameData  {
    static best = "BEST"
    // private static _instance:GameData
    private static score =  0
    static addScore(addScore:number){
        this.score += addScore
    }

    static getScore(){
        return this.score
    }

    static getBestScoreNum(){
        let bestScale =  localStorage.getItem(this.best)
        if(bestScale){
            return Number.parseInt(bestScale)
        }else{
            return 0
        }
    }

    static saveBestScoreNum(){
        if(this.getScore()>this.getBestScoreNum()){
            localStorage.setItem(this.best,this.getScore().toString())
        }
    }
}


