import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RootComponent } from './components/root/root.component';
import { RegisterComponent } from './components/register/register.component';
import { RemoveComponent } from './components/remove/remove.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { CheckComponent } from './components/check/check.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import { AccountComponent } from './components/account/account.component';
import { WarningComponent } from './components/dialogs/warning/warning.component';


@NgModule({
  declarations: [
    RootComponent,
    RegisterComponent,
    RemoveComponent,
    TransferComponent,
    CheckComponent,
    AccountComponent,
    WarningComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
