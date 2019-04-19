import { NgModule } from '@angular/core';
import { PopoverComponent } from './popover/popover';
import { PopoverMapComponent } from './popover-map/popover-map';
import { AccordionComponent } from './accordion/accordion';
@NgModule({
	declarations: [PopoverComponent,
    PopoverMapComponent,
    AccordionComponent],
	imports: [],
	exports: [PopoverComponent,
    PopoverMapComponent,
    AccordionComponent]
})
export class ComponentsModule {}
