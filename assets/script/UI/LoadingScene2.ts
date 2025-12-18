import { _decorator, Component, director, Node, ProgressBar, SpriteFrame, Texture2D } from 'cc';
import { ResUtils } from '../utils/ResUtils';
const { ccclass, property } = _decorator;


@ccclass('LoadingScene2')
export class LoadingScene2 extends Component {

    @property(ProgressBar)
    private processBar:ProgressBar
    // 进度回调，可绑定 UI Slider / ProgressBar
    updateProgress(progress: number) {
        console.log(`加载进度: ${(progress * 100).toFixed(1)}%`);
        // TODO: 更新进度条 UI
    }

    async start() {
        // ResUtils.resUtils.loadFolderAssets("img", SpriteFrame, (progress) => {
        //     console.log("加载进度:", progress)
        // }).then(()=>{
        //     //   director.loadScene("mainScene");
        // })

        ResUtils.resUtils.loadFolderAssets("img", SpriteFrame, (progress) => {
            console.log("加载进度:", progress)
        }).then(()=>{
            //   director.loadScene("mainScene");
        })
    }
}

