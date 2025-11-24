import { _decorator, Color, Component, director, Node, Sprite, tween, UIOpacity, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FadeManager')
export class FadeManager extends Component {
    private static _instance: FadeManager;
    @property(Node)
    mask!: Node;   // UI 遮罩节点
    public static get instance() {
        return this._instance;
    }

     onLoad() {
        FadeManager._instance = this;
        this.node.setSiblingIndex(99999);  // 永远置顶 UI
        director.addPersistRootNode(this.node); // 跨场景不销毁
    }

    /** 渐变切换场景 */
    fadeToScene(sceneName: string, duration: number = 0.5, color?: Color) {
        const maskSprite = this.mask.getComponent(UIOpacity)!;
        if (color) {
            let sprite:Sprite = this.mask.getComponent(Sprite)
            sprite.color = color;
        }
        // 淡出
        tween(maskSprite)
            .to(duration, { opacity: 255 })
            .call(() => {
                director.loadScene(sceneName, () => {
                    // 淡入
                    tween(maskSprite)
                        .to(duration, { opacity: 0 })
                        .start();
                });
            })
            .start();
    }


    
    /** 渐变切换场景 */
    fadeOut(duration: number = 0.5, color?: Color) {
        const maskSprite = this.mask.getComponent(UIOpacity)!;
        if (color) {
            let sprite:Sprite = this.mask.getComponent(Sprite)
            sprite.color = color;
        }
        // 淡出
        tween(maskSprite)
            .to(duration, { opacity: 0 })
            .start();
    }

    
}


