import { _decorator, Component, Node, ResolutionPolicy, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Adapter')
export class Adapter extends Component {
    protected onLoad(): void {
        let width = view.getVisibleSize().width
        if(width < 720){
            //
            view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH)
        }
    }
}


