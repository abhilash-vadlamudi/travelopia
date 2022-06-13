import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ModalData {
  title: String,
  text: String,
  confirmBtnText: String,
  cancelBtnText: String,
  thirdPartyButtonClass: String
  hideCancelBtn: Boolean
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  title: String = "Confirm";
  text: String = "Are You Sure ?";
  confirmBtnText: String = "OK";
  cancelBtnText: String = "Cancel";
  hideCancelBtn: Boolean = false;
  thirdPartyButtonClass: String = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalData) {
    if (data) {
      this.title = data.title || this.title;
      this.text = data.text || this.text;
      this.confirmBtnText = data.confirmBtnText || this.confirmBtnText;
      this.cancelBtnText = data.cancelBtnText || this.cancelBtnText;
      this.hideCancelBtn = (data.hideCancelBtn === true || data.hideCancelBtn === false) ? data.hideCancelBtn : this.hideCancelBtn
      this.thirdPartyButtonClass = data.thirdPartyButtonClass || this.thirdPartyButtonClass;
    }
  }
}