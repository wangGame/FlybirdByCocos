import { _decorator, Component, director, Node, RenderRoot2D } from 'cc';
import Singleton from '../utils/Singleton';
import { DrawManager } from '../utils/DrawManager';
import { createUINode } from '../utils';
const { ccclass, property } = _decorator;

export default class FaderManager extends Singleton {
  static get Instance() {
    return super.GetInstance<FaderManager>()
  }

  private _fader: DrawManager = null

  get fader(): DrawManager {
    if (this._fader !== null) {
      return this._fader
    }

    const root = createUINode()
    root.addComponent(RenderRoot2D)

    const node = createUINode()
    node.setParent(root)
    this._fader = node.addComponent(DrawManager)
    this._fader.init()
    director.addPersistRootNode(root)

    return this._fader
  }

  async fadeIn(duration: number = 1) {
    await this.fader.fadeIn(duration)
  }

  async fadeOut(duration: number = 1) {
    await this.fader.fadeOut(duration)
  }

  async mask() {
    await this.fader.mask()
  }
}
