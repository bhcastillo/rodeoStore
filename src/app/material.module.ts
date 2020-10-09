import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    
  ],
  exports:[
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
