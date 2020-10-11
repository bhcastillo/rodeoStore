//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PipesModule } from '../pipes/pipes.module';
//Components
import { CardComponent } from './card/card.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [    
    CardComponent, SearchComponent,
],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule
  ],
  exports:[
    CardComponent, SearchComponent
  ]
})
export class ComponentsModule { }
