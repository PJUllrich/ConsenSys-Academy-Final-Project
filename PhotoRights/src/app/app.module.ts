import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RootComponent } from './components/root/root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { AccountComponent } from './components/account/account.component';
import { WarningComponent } from './components/dialogs/warning/warning.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { ContractComponent } from './components/contract/contract.component';
import { AbiComponent } from './components/dialogs/abi/abi.component';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from './components/upload/upload.component';
import { EventsComponent } from './components/events/events.component';
import { EventDialogComponent } from './components/dialogs/event-dialog/event-dialog.component';


@NgModule({
  declarations: [
    RootComponent,
    AccountComponent,
    WarningComponent,
    RegistrationsComponent,
    ContractComponent,
    AbiComponent,
    UploadComponent,
    EventsComponent,
    EventDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    FormsModule,
    MatTableModule,
    MatSortModule
  ],
  entryComponents: [
    AbiComponent,
    WarningComponent,
    EventDialogComponent
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule {
}
