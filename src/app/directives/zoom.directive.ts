import { Directive ,ElementRef,Host,HostListener, Input, Renderer2, input} from '@angular/core';

@Directive({
  selector: '[appZoom]',
  standalone: true,
 
})
export class ZoomDirective {

  constructor(private ele:ElementRef,private renderer:Renderer2) { }
  @HostListener('mouseenter') onhover(){
      this.zoom();
  }
  private zoom(){
    this.ele.nativeElement.style.transform='scale(5.5)';
    this.ele.nativeElement.style.transition='0.5s ease-out'
    this.renderer.setStyle(this.ele.nativeElement, 'z-index', '10');

  }
  private normal(){
    this.renderer.setStyle(this.ele.nativeElement, 'z-index', '2');
    this.ele.nativeElement.style.transform='scale(1.0)';
    this.ele.nativeElement.style.transition='0.5s'


  }
  @HostListener('mouseleave') offhover(){
    this.normal();
  }

}
