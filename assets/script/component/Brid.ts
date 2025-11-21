import { _decorator, Animation, Collider, Collider2D, Component, Contact2DType, Input, input, IPhysics2DContact, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import { GameManagerNew } from '../manager/GameManagerNew';
import { AudioPlayer } from './AudioPlayer';
const { ccclass, property } = _decorator;

@ccclass('Brid')
export class Brid extends Component {
    private _rigiBody:RigidBody2D
    private _collider:Collider2D
    private _canCtrl:boolean = false

    protected onLoad(): void {
         this._rigiBody = this.getComponent(RigidBody2D)
        input.on(Input.EventType.TOUCH_START,this.touchStart,this)   
        this._collider = this.getComponent(Collider2D)
        if(this._collider){
            this._collider.on(Contact2DType.BEGIN_CONTACT,this.onBeiginContact,this)
            this._collider.on(Contact2DType.END_CONTACT,this.onEndContact,this)
        }
    }

    onBeiginContact(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact | null){
        if(otherCollider.tag == 10 || otherCollider.tag == 20){
            GameManagerNew.instance.gameOver() 
        }
    }

    onEndContact(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact | null){
        if(otherCollider.tag == 30){
            GameManagerNew.instance.addScore() 
        }
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START,this.touchStart,this)
        this._collider.off(Contact2DType.BEGIN_CONTACT,this.onBeiginContact,this)
        this._collider.off(Contact2DType.END_CONTACT,this.onEndContact,this)
    }
    
    touchStart(){
        if(this._canCtrl){
            AudioPlayer.instance().playClick()
            this._rigiBody.linearVelocity = new Vec2(0,10)
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
        this._rigiBody.enabled = true

    }

    public disableConctrl(){
        this.getComponent(Animation).enabled = false
        this._canCtrl = false
        this._rigiBody.enabled = false
    }

    public gameOver(){
        this.getComponent(Animation).enabled = false
        this._canCtrl = false
       
        
    }
}


