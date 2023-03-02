import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Festival } from 'src/app/models/festival';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.css']
})
export class FestivalDetailsComponent {
  constructor (private messageService: MessageService, private formBuilder: FormBuilder) {}

  @Input() festival!: Festival
  public festivalGroup!: FormGroup<{
    name: FormControl,
    tablemax_1: FormControl,
    tablemax_2: FormControl,
    tablemax_3: FormControl
  }>

  initForm(): void {
    this.festivalGroup = this.formBuilder.group({
      name: [this.festival.name, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      tablemax_1: [this.festival.tablemax_1, [Validators.required, Validators.pattern('[0-9]*')]],
      tablemax_2: [this.festival.tablemax_2, [Validators.required, Validators.pattern('[0-9]*')]],
      tablemax_3: [this.festival.tablemax_3, [Validators.required, Validators.pattern('[0-9]*')]],
    })
  }

  onSubmit(): void {
    this.messageService.log(`Festival mis à jour`)
    this.festival.name = this.festivalGroup.value.name
    this.festival.tablemax_1 = this.festivalGroup.value.tablemax_1
    this.festival.tablemax_2 = this.festivalGroup.value.tablemax_2
    this.festival.tablemax_3 = this.festivalGroup.value.tablemax_3
  }

  ngOnChanges(): void {
    this.initForm()
  }
}
