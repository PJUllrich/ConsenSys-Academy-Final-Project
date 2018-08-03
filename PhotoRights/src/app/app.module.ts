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
  MatGridListModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import { AccountComponent } from './components/account/account.component';
import { WarningComponent } from './components/dialogs/warning/warning.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { ContractComponent } from './components/contract/contract.component';
import { EventComponent } from './components/event/event.component';
import { AbiComponent } from './components/dialogs/abi/abi.component';


@NgModule({
  declarations: [
    RootComponent,
    RegisterComponent,
    RemoveComponent,
    TransferComponent,
    CheckComponent,
    AccountComponent,
    WarningComponent,
    RegistrationsComponent,
    ContractComponent,
    EventComponent,
    AbiComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule
  ],
  entryComponents: [
    AbiComponent
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule {
}
