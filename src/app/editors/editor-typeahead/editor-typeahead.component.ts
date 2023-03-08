import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { map, Observable, startWith } from 'rxjs'
import { Editor } from 'src/app/models/editor'
import { EditorsService } from 'src/app/service/editors.service'

@Component({
  selector: 'app-editor-typeahead',
  templateUrl: './editor-typeahead.component.html',
  styleUrls: ['./editor-typeahead.component.scss'],
})
export class EditorTypeaheadComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private editorsService: EditorsService
  ) {}

  @Output() selected = new EventEmitter<Editor>()

  filteredOptions!: Observable<Editor[]>

  form: FormGroup<{
    name: FormControl
  }> = this.formBuilder.group({
    name: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.filteredOptions = this.editorsService.getEditors()
  }

  onSubmit(): void {
    this.filteredOptions.subscribe(options => {
      options.filter(option => {
        if (option.name === this.form.value.name) {
          this.selected.emit(option)
        }
      })
    })
  }
}
