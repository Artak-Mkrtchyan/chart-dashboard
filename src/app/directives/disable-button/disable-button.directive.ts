import {
  Directive,
  ElementRef,
  HostListener,
  input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  standalone: true,
  selector: '[appDisabledButton]',
  providers: [MatTooltip],
})
export class DisableButtonDirective {
  isViewerDisabled = input<boolean>();
  viewerTooltip = input<string | null>();

  @HostListener('mouseover') mouseover() {
    if (this.viewerTooltip() && this.isViewerDisabled()) {
      this.tooltip.message = this.viewerTooltip();
      this.tooltip.show();
    }
  }

  @HostListener('mouseleave') mouseleave() {
    this.tooltip.hide();
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private tooltip: MatTooltip,
    private button: MatButton
  ) {}

  ngOnInit() {
    this.updateButtonState();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isViewerDisabled']) {
      this.updateButtonState();
    }
  }

  private updateButtonState() {
    if (this.isViewerDisabled()) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'not-allowed');
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'auto');
      this.button.disabled = true;
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
      this.button.disabled = false;
    }
  }
}
