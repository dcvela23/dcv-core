import { offset } from './../../utils/offset'
import { hasClass, addClass, removeClass } from './../../utils/classes'

import three from './../../utils/three.min.js'

class ThreeImage1 {
  constructor(el){
    three()
    this.container = document.body
    this.itemWrapper = el.querySelector('.grid')

    console.log(THREE)

    this.setup();

  }

  // getters

  get viewport() {
    let width = this.container.clientWidth
  }

  setup(){
    //renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true})
    this.renderer.setSize(this.viewport.width, this.viewport.height)
  }
} export default ThreeImage1;
