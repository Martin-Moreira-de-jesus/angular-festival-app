import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Festival } from 'src/app/models/festival';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
  styleUrls: ['./festivals-list.component.css']
})
export class FestivalsListComponent {
  constructor(private messageService: MessageService) {}

  @Input() public festivals!: Festival[];
  @Output() selected = new EventEmitter<Festival>();

  ngOnInit(): void {
    this.messageService.log(`Affichage de ${this.festivals.length} festivals`)
  }

  ngAfterViewChecked(): void {
    this.messageService.log("Réaffichage")
  }

  onClickSelect(festival: Festival): void {
    this.selected.emit(festival)
  }
}
