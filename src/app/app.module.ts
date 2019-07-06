import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { GeneralContentComponent } from './general-content/general-content.component';
import { HttpClientModule } from '@angular/common/http';
import { TablefilterPipe, MultiSelectFilterPipe } from './pipes/tablefilter.pipe';
import { TableComponent } from './table/table.component';
import { MapmodulePipe } from './pipes/mapmodule.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    GeneralContentComponent,
    MapmodulePipe
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
