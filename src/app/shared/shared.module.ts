import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Components
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule, 
    AppRoutingModule,
    RouterModule,
    
  ],
  exports:[ 
    HeaderComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
