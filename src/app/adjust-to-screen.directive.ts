import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input,
  HostListener,
} from '@angular/core'

@Directive({
  selector: '[appAdjustToScreen]',
})
export class AdjustToScreenDirective implements AfterViewInit {
  @Input('appAdjustToScreenTrigger') trigger: string | undefined

  private minFontSize = 10
  private maxFontSize = 600
  private el: HTMLElement

  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2,
  ) {
    this.el = this.elementRef.nativeElement
  }

  ngAfterViewInit() {
    this.deferResize()
  }

  @HostListener('window:resize')
  onResize() {
    this.deferResize()
  }

  ngOnChanges() {
    this.deferResize()
  }

  private deferResize() {
    setTimeout(() => this.resizeText(), 0)
  }

  public resizeText() {
    const parent = this.el.parentElement
    if (!parent) return

    let fontSize = this.maxFontSize

    this.renderer.setStyle(this.el, 'white-space', 'nowrap')

    while (fontSize >= this.minFontSize) {
      this.renderer.setStyle(this.el, 'font-size', `${fontSize}px`)
      const { scrollWidth } = this.el

      if (scrollWidth <= parent.clientWidth) {
        break
      }

      fontSize -= 1
    }
  }
}
