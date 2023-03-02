import { Component } from '@angular/core';
import { Festival } from './models/festival';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Festival Application'
  public festivals: Festival[] = []
  public currentFestival!: Festival

  ngOnInit(): void {
    this.festivals = [
      new Festival(
        "Fjm 2018",
      ),
      new Festival(
        "Fjm 2019",
      ),
      new Festival(
        "Fjm 2020",
      )
    ]
  }

  onSelect($event: Festival) {
    this.currentFestival = $event
  }
}
