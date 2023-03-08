import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { Editor } from 'src/app/models/editor'
import { EditorsService } from 'src/app/service/editors.service'

@Component({
  selector: 'app-editor-details',
  templateUrl: './editor-details.component.html',
  styleUrls: ['./editor-details.component.scss'],
})
export class EditorDetailsComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private editorsService: EditorsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private snackBarDuration = 2
  isCreate = true
  editor!: Editor

  form: FormGroup<{
    name: FormControl
    mail: FormControl
    phone: FormControl
  }> = this.formBuilder.group({
    name: ['', [Validators.required]],
    mail: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
  })

  ngOnInit(): void {
    const editorId = this.route.snapshot.paramMap.get('editorId')
    if (editorId) {
      this.isCreate = false
      this.editorsService.getEditor(editorId).subscribe((e: Editor) => {
        this.editor = e
        this.setFormValue()
      })
    }
  }

  setFormValue(): void {
    this.form.setValue({
      name: this.editor.name,
      mail: this.editor.mail,
      phone: this.editor.phone,
    })
  }

  onSubmit(): void {
    const data = Editor.fromJSON(this.form.value)
    if (!this.form.valid) return
    if (!this.isCreate) {
      data.id = this.editor.id
      this.editorsService.updateEditor(data)
      this.snackBar.open('Editeur Modifié', undefined, {
        duration: this.snackBarDuration * 1000,
      })
    } else {
      this.editorsService.pushEditor(data)
      this.router.navigate(['/editors'])
    }
  }

  onCancel(): void {
    this.router.navigate(['/editors'])
  }

  onDelete(): void {
    this.editorsService.deleteEditor(this.editor)
    this.router.navigate(['/editors'])
  }
}
