import { offset } from './../../utils/offset'
import { hasClass, addClass, removeClass } from './../../utils/classes'
import ease from './svg-transitions-easings'

class SvgTransitions {
  constructor(el){
    this.shapesWrapper = el.querySelector('.shape-overlays');
    this.path = this.shapesWrapper.querySelectorAll('path');
    this.numBeizerPoints = 2;
    this.duration = 1300;
    this.delayPointsArray = [];
    this.delayPointsMax = 0;
    this.delayPerPath = 100;
    this.timeStart = Date.now();
    this.isOpened = false;
    this.isAnimating = false;
    this.navBtns = document.querySelectorAll('.main__wrapper ul li')

    this.initEvents();
  }

  initEvents(){
    this.navBtns.forEach((el) => {
      el.addEventListener('click',() => {
        this.toggle()
      })
    })
  }

  toggle() {
    this.isAnimating = true;
    for (var i = 0; i < this.numBeizerPoints; i++) {
      this.delayPointsArray[i] = 0;
    }
    if (this.isOpened === false) {
      this.open();
    } else {
      this.close();
    }
  }
  open() {
    this.isOpened = true;
    this.timeStart = Date.now();
    this.renderLoop();
  }
  close() {
    this.isOpened = false;
    this.timeStart = Date.now();
    this.renderLoop();
  }
  updatePath(time) {
    const points = [];
    for (var i = 0; i < this.numBeizerPoints; i++) {
      const thisEase = this.isOpened ?
                        (i == 1) ? ease.cubicOut : ease.cubicInOut:
                        (i == 1) ? ease.cubicInOut : ease.cubicOut;
      points[i] = thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
    }

    let str = '';
    str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;


    for (var i = 0; i < this.numBeizerPoints - 1; i++) {
      const p = (i + 1) / (this.numBeizerPoints - 1) * 100;
      const cp = p - (1 / (this.numBeizerPoints - 1) * 100) / 2;
      str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
    }
    str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;

    return str;
  }
  render() {
    if (this.isOpened) {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));

      }
    } else {
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
      }
    }
  }
  renderLoop() {
    this.render();
    if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
      requestAnimationFrame(() => {
        this.renderLoop();
      });
    }
    else {
      this.isAnimating = false;
    }
  }

} export default SvgTransitions;
