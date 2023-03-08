import { Component, OnChanges, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { Editor } from 'src/app/models/editor'
import { Attending, Festival } from 'src/app/models/festival'
import { EditorsService } from 'src/app/service/editors.service'
import { FestivalsService } from 'src/app/service/festival.service'

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.scss'],
})
export class FestivalDetailsComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private festivalsService: FestivalsService,
    private editorsService: EditorsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private snackBarDuration = 2
  isCreate = true
  festival!: Festival
  editors: Observable<Editor[]> = new Observable()

  form: FormGroup<{
    name: FormControl
    tablemax_1: FormControl
    tableprice_1: FormControl
    tablemax_2: FormControl
    tableprice_2: FormControl
    tablemax_3: FormControl
    tableprice_3: FormControl
  }> = this.formBuilder.group({
    name: ['', [Validators.required]],
    tablemax_1: ['', [Validators.required]],
    tableprice_1: ['', [Validators.pattern('[0-9]{1,5}')]],
    tablemax_2: ['', [Validators.pattern('[0-9]{1,5}')]],
    tableprice_2: ['', [Validators.pattern('[0-9]{1,5}')]],
    tablemax_3: ['', [Validators.pattern('[0-9]{1,5}')]],
    tableprice_3: ['', [Validators.pattern('[0-9]{1,5}')]],
  })

  ngOnInit(): void {
    const festivalId = this.route.snapshot.paramMap.get('festivalId')
    if (festivalId) {
      this.isCreate = false
      this.festivalsService.getFestival(festivalId).subscribe((e: Festival) => {
        this.festival = e
        this.setFormValue()
        this.festival.attending.forEach(attendee => {
          this.editorsService
            .getEditor(attendee.editorId)
            .subscribe((e: Editor) => {
              this.editors.pipe(tap(editors => editors.push(e)))
            })
        })
      })
    }
  }

  setFormValue(): void {
    this.form.setValue({
      name: this.festival.name,
      tablemax_1: this.festival.tablemax_1,
      tableprice_1: this.festival.tableprice_1,
      tablemax_2: this.festival.tablemax_2,
      tableprice_2: this.festival.tableprice_2,
      tablemax_3: this.festival.tablemax_3,
      tableprice_3: this.festival.tableprice_3,
    })
  }

  onSubmit(): void {
    const data = Festival.fromJSON(this.form.value)
    if (!this.isCreate) {
      data.id = this.festival.id
      this.festivalsService.updateFestival(data)
      this.snackBar.open('Festival Modifié', undefined, {
        duration: this.snackBarDuration * 1000,
      })
    } else {
      this.festivalsService.pushFestival(data)
      this.router.navigate(['/festivals'])
    }
  }

  onCancel(): void {
    this.router.navigate(['/festivals'])
  }

  onDelete(): void {
    this.festivalsService.deleteFestival(this.festival)
    this.router.navigate(['/festivals'])
  }

  onSelect(editor: Editor): void {
    const newAttendance: Attending = {
      editorId: editor.id,
      gamesPresented: [],
    }

    this.festival.attending.push(newAttendance)
    this.festivalsService.updateFestival(this.festival)
  }
}
