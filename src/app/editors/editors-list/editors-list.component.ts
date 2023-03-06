import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Editor } from 'src/app/models/editor'
import { EditorsService } from 'src/app/service/editors.service'

@Component({
  selector: 'app-editors-list',
  templateUrl: './editors-list.component.html',
  styleUrls: ['./editors-list.component.scss'],
})
export class EditorsListComponent implements OnInit {
  constructor(private editorsService: EditorsService, private router: Router) {}

  public editors!: Observable<Editor[]>

  public displayedColumns: string[] = ['Id', 'Nom', 'Mail', 'Telephone']

  ngOnInit(): void {
    this.editors = this.editorsService.getEditors()
  }

  clickedRow(editor: Editor): void {
    this.router.navigate([`/editors/${editor.id}`])
  }

  onClick(): void {
    this.router.navigate(['/editors/new'])
  }
}
