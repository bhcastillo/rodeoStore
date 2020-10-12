import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Components
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { AsideComponent } from './aside/aside.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AsideComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule, 
    AppRoutingModule,
    ComponentsModule,
    RouterModule,
    FormsModule
  ],
  exports:[ 
    HeaderComponent,
    FooterComponent,
    AsideComponent
  ]
})
export class SharedModule { }
