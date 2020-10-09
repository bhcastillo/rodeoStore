//Modules
import { NgModule } from '@angular/core';
//Pipes
import { DescriptionPipe } from './description.pipe';

@NgModule({
  declarations: [
    DescriptionPipe
  ],
  exports:[
    DescriptionPipe
  ]
})
export class PipesModule { }
