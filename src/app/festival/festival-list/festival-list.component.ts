import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Festival } from 'src/app/models/festival'
import { FestivalsService } from 'src/app/service/festival.service'

@Component({
  selector: 'app-festival-list',
  templateUrl: './festival-list.component.html',
  styleUrls: ['./festival-list.component.scss'],
})
export class FestivalListComponent implements OnInit {
  constructor(
    private festivalService: FestivalsService,
    private router: Router
  ) {}

  public festivals!: Observable<Festival[]>

  public displayedColumns: string[] = [
    'Id',
    'Nom',
    'Tables',
    'Prix Espace Entrée',
    'Prix Espace Salle',
    'Prix Espace Buvette',
    'm² Entrée',
    'm² Salle',
    'm² Buvette',
    '# Tables Entrée',
    '# Tables Salle',
    '# Tables Buvette',
  ]

  ngOnInit(): void {
    this.festivals = this.festivalService.getFestivals()
  }

  clickedRow(festival: Festival): void {
    this.router.navigate([`/festivals/${festival.id}`])
  }

  onClick(): void {
    this.router.navigate(['/festivals/new'])
  }
}
