import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { TextFilterComponent } from './components/filters/text-filter/text-filter.component';
import { RolesFilterComponent } from './components/filters/roles-filter/roles-filter.component';
import { DepartmentFilterComponent } from './components/filters/department-filter/department-filter.component';
import { ActiveFilterComponent } from './components/filters/active-filter/active-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    LoginComponent,
    TextFilterComponent,
    RolesFilterComponent,
    DepartmentFilterComponent,
    ActiveFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withInterceptorsFromDi()
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
