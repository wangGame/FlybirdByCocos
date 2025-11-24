import { _decorator, Component, director, Label, Node, ProgressBar, SpriteFrame, Texture2D } from 'cc';
import { ResUtils } from '../utils/ResUtils';
import FaderManager from '../view/FaderManager';
const { ccclass, property } = _decorator;


@ccclass('LoadingScene2')
export class LoadingScene2 extends Component {
    @property(Label)
    private processLabel:Label
    @property(ProgressBar)
    private processBar:ProgressBar
    // 进度回调，可绑定 UI Slider / ProgressBar
    updateProgress(progress: number) {
        console.log(`加载进度: ${(progress * 100).toFixed(1)}%`);
        // TODO: 更新进度条 UI
        this.processBar.progress = progress
        this.processLabel.string = (progress * 100).toFixed(1)
    }

    async start() {
        // ResUtils.resUtils.loadFolderAssets("img", SpriteFrame, (progress) => {
        //     console.log("加载进度:", progress)
        // }).then(()=>{
        //     //   director.loadScene("mainScene");
        // })

        ResUtils.resUtils.loadFolderAssets("img", SpriteFrame, (progress) => {
            console.log("加载进度:", progress)
            this.updateProgress(progress)
        }).then(()=>{
            director.loadScene("mainScene")
        })
    }
}

