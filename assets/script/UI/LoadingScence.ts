import { _decorator, Component, director, Node, ProgressBar, SpriteFrame } from 'cc';
import { ResUtils } from '../utils/ResUtils';
const { ccclass, property } = _decorator;

@ccclass('LoadingScence')
export class LoadingScence extends Component {

    @property(ProgressBar)
    private processBar:ProgressBar
    // 进度回调，可绑定 UI Slider / ProgressBar
    updateProgress(progress: number) {
        console.log(`加载进度: ${(progress * 100).toFixed(1)}%`);
        // TODO: 更新进度条 UI
    }

    start() {
        // 所有资源路径列表
        const paths = [
            "img/bar_down/spriteFrame",
            "img/bar_up/spriteFrame",
            "img/bird_yellow_2/spriteFrame",
            "img/brid_yellow_1/spriteFrame",
            "img/bird_yellow_3/spriteFrame",
            "img/game_bg/spriteFrame",
            "img/game_floor/spriteFrame",
            "img/game_medal_1/spriteFrame",
            "img/game_medal_2/spriteFrame",
            "img/game_medal_3/spriteFrame",
            "img/game_medal_4/spriteFrame",
            "img/game_over/spriteFrame",
            "img/game_ready/spriteFrame",
            "img/game_result_bg/spriteFrame",
            "img/game_start_1/spriteFrame",
            "img/game_start_2/spriteFrame",
            "img/game_tap_tip/spriteFrame",
            "img/num_big_0/spriteFrame",
            "img/num_big_1/spriteFrame",
            "img/num_big_2/spriteFrame",
            "img/num_big_3/spriteFrame",
            "img/num_big_4/spriteFrame",
            "img/num_big_5/spriteFrame",
            "img/num_big_6/spriteFrame",
            "img/num_big_7/spriteFrame",
            "img/num_big_8/spriteFrame",
            "img/num_big_9/spriteFrame",
            "img/num_score_0/spriteFrame",
            "img/num_score_1/spriteFrame",
            "img/num_score_2/spriteFrame",
            "img/num_score_3/spriteFrame",
            "img/num_score_4/spriteFrame",
            "img/num_score_5/spriteFrame",
            "img/num_score_6/spriteFrame",
            "img/num_score_7/spriteFrame",
            "img/num_score_8/spriteFrame",
            "img/num_score_9/spriteFrame",
        ];

        let loadedCount = 0;
        const total = paths.length;

        // 生成 Promise 数组
        const promises = paths.map(path => {
            return ResUtils.resUtils.loadResAsset(path, SpriteFrame)
                .then(asset => {
                    loadedCount++;
                    this.updateProgress(loadedCount / total); // 更新进度
                    return asset;
                })
                .catch(err => {
                    console.error(`加载资源失败: ${path}`, err);
                    loadedCount++;
                    this.updateProgress(loadedCount / total); // 失败也算进度
                });
        });

        // 等待所有加载完成
        Promise.all(promises).then(() => {
            console.log("所有资源加载完成");
            director.loadScene("mainScene");
        });
    }
}

