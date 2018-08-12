import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract/contract.service';
import { ResultDialogComponent } from '../dialogs/result-dialog/result-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public isPaused: boolean = false;

  constructor(private contractService: ContractService, private dialog: MatDialog, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.checkIsPaused();
  }

  public pause() {
    this.contractService.pause()
      .then(() => {
        this.dialog.open(ResultDialogComponent, {
          data: {
            success: true,
            message: 'Contract paused successfully'
          }
        });
        this.isPaused = true;
      })
      .catch(error => this.dialog.open(ResultDialogComponent, {
        data: {
          success: false,
          message: 'An error occurred while pausing the contract: ' + JSON.stringify(error)
        }
      }));
  }

  public unpause() {
    this.contractService.unpause()
      .then(() => {
        this.dialog.open(ResultDialogComponent, {
          data: {
            success: true,
            message: 'Contract unpaused successfully'
          }
        });
        this.isPaused = false;
      })
      .catch(error => this.dialog.open(ResultDialogComponent, {
        data: {
          success: false,
          message: 'An error occurred while unpausing the contract: ' + JSON.stringify(error)
        }
      }));
  }

  private checkIsPaused() {
    this.contractService.isPaused()
      .then(isPaused => {
        this.isPaused = isPaused;
        // this.ref.detectChanges();
      });
  }
}
