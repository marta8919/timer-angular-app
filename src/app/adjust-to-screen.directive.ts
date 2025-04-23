import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
  Renderer2,
  signal,
} from '@angular/core'

@Directive({
  selector: '[appAdjustToScreen]',
})
export class AdjustToScreenDirective implements AfterViewInit {
  minFontSize = signal<number>(10)
  maxFontSize = signal<number>(300)

  el: HTMLElement

  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2,
  ) {
    this.el = this.elementRef.nativeElement
  }

  ngAfterViewInit() {
    this.resizeText()
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeText()
  }

  resizeText() {
    const parent = this.el.parentElement
    if (!parent) return

    let fontSize = this.maxFontSize()

    this.renderer.setStyle(this.el, 'white-space', 'nowrap')

    while (fontSize >= this.minFontSize()) {
      this.renderer.setStyle(this.el, 'font-size', `${fontSize}px`)
      const { scrollWidth, clientWidth } = this.el

      if (scrollWidth <= parent.clientWidth) {
        break
      }

      fontSize -= 1
    }
  }
}
