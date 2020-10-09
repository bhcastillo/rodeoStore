//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PipesModule } from '../pipes/pipes.module';
//Components
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [    
    CardComponent,
],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule
  ],
  exports:[
    CardComponent,
  ]
})
export class ComponentsModule { }
