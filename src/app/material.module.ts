import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatRadioModule } from "@angular/material/radio"
import { MatSelectModule } from "@angular/material/select"
import { MatInputModule } from "@angular/material/input"
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule
  ]
})

export class MaterialModule {

}