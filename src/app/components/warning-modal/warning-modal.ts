import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquareXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-warning-modal',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './warning-modal.html',
  styleUrl: './warning-modal.scss',
})
export class WarningModal {
  @Input() text!: string;
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmChoice = new EventEmitter<void>();

  faSquareXmark: IconDefinition = faSquareXmark;

  message: string = '';
  isMessageSuccess:boolean = false;

  clickConfirmChoice() {
    this.confirmChoice.emit();
    this.closeModal.emit();
  }
}