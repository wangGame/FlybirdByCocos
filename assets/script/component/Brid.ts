import { _decorator, Animation, Collider, Collider2D, Component, Contact2DType, Input, input, IPhysics2DContact, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import { GameManager } from '../manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('Brid')
export class Brid extends Component {
    rigiBody:RigidBody2D
    collider:Collider2D
    private _canCtrl:boolean = false
    protected onLoad(): void {
         this.rigiBody = this.getComponent(RigidBody2D)
        input.on(Input.EventType.TOUCH_START,this.touchStart,this)   
        this.collider = this.getComponent(Collider2D)
        if(this.collider){
            this.collider.on(Contact2DType.BEGIN_CONTACT,this.onBeiginContact,this)
            this.collider.on(Contact2DType.END_CONTACT,this.onEndContact,this)
        }
    }

    onBeiginContact(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact | null){
        // console.log(selfCollider.tag)
        // console.log(otherCollider.tag)
        if(otherCollider.tag == 10 || otherCollider.tag == 20){
            GameManager.inst().transitionToGameOver() 
        }
    }

    onEndContact(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact | null){
        if(otherCollider.tag == 30){
            GameManager.inst().addScore()
        }
    }

    start() {
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START,this.touchStart,this)
        this.collider.off(Contact2DType.BEGIN_CONTACT,this.onBeiginContact,this)
        this.collider.off(Contact2DType.END_CONTACT,this.onEndContact,this)
    }

    
    touchStart(){
        if(this._canCtrl){
            this.rigiBody.linearVelocity = new Vec2(0,10)
            this.node.angle = 30        
        }
    }

    update(deltaTime: number) {
        if(this._canCtrl){
            this.node.angle -= 60*deltaTime
            if(this.node.angle<-60){
                this.node.angle = -60
            }
        }
    }

    public enableConctrl(){
        this.getComponent(Animation).enabled = true
        this._canCtrl = true
        this.rigiBody.enabled = true

    }

    public disableConctrl(){
        this.getComponent(Animation).enabled = false
        this._canCtrl = false
        this.rigiBody.enabled = false
    }
}


