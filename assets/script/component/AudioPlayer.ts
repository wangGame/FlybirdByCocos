import { _decorator, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioPlayer')
export class AudioPlayer extends Component {
    private bgSource
    private effectSource
    start() {
        this.bgSource = this.node.getComponent(AudioSource)[0];
        this.effectSource = this.node.getComponent(AudioSource)[1];
    }

    public playBgMusic() {
        if (this.bgSource && !this.bgSource.playing) {
            this.bgSource.play();
        }  
    }
    
}


