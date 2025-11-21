import { _decorator, Component, Node, ResolutionPolicy, view } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 只需要在第一个脚本的地方执行即可
 */
@ccclass('Adapter')
export class Adapter extends Component {
    protected onLoad(): void {
        let width = view.getVisibleSize().width
        console.log(view)
        if(width < 720){
            //
            view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH)
        }
    }
}


