import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioPlayer')
export class AudioPlayer extends Component {
    private bgSource:AudioSource
    private effectSource:AudioSource

    @property(AudioClip)
    private bgClip:AudioClip
    
    @property(AudioClip)
    private clickClip:AudioClip
    
    @property(AudioClip)
    private gameOverClip:AudioClip

    private static _audioInstance

    protected onLoad(): void {
        AudioPlayer._audioInstance = this    
    }
    
    public static instance(){
        return AudioPlayer._audioInstance
    }

    private isPlayBgMusic
    start() {
        this.bgSource = this.node.getComponents(AudioSource)[0];
        this.effectSource = this.node.getComponents(AudioSource)[1];
        
    }

    public playBgMusic() {
        this.isPlayBgMusic = true
        this.bgSource.clip = this.bgClip
        this.bgSource.play()
        this.bgSource.loop = true
    }

    stopBg(){
        this.isPlayBgMusic = false
        this.bgSource.play()
    }

    playClick(){
        this.effectSource.playOneShot(this.clickClip)
    }

    playGameOver(){
        this.effectSource.playOneShot(this.gameOverClip)
    }
}


