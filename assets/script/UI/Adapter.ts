import { _decorator, Component, Node, ResolutionPolicy, View, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Adapter')
export class Adapter extends Component {
    start() {

        console.log(view)
        console.log(View)
    
        let ebdV = view.getViewportRect().width / view.getViewportRect().height
        let vv = view.getDesignResolutionSize().width / view.getDesignResolutionSize().height

        // console.log(view.getViewportRect())
        console.log(ebdV)
        console.log(vv)

        if(ebdV>vv){
            view.setResolutionPolicy(ResolutionPolicy.FIXED_HEIGHT)
        }else{
            view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH)
        }
        
    }

    update(deltaTime: number) {
        
    }
}


