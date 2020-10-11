//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PipesModule } from '../pipes/pipes.module';
//Components
import { CardComponent } from './card/card.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [    
    CardComponent, SearchComponent,
],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    PipesModule
  ],
  exports:[
    CardComponent, SearchComponent
  ]
})
export class ComponentsModule { }
