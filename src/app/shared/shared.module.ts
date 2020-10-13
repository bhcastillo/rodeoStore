import { NgModule } from '@angular/core';
//Modules
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
//Components
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';



@NgModule({
  declarations: [
    HeaderComponent,
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
    AsideComponent
  ]
})
export class SharedModule { }
