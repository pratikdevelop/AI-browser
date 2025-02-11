import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabcontent',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './tabcontent.component.html',
  styleUrl: './tabcontent.component.css'
})
export class TabcontentComponent {

  tabId: string | null;

  constructor(private route: ActivatedRoute) {
    this.tabId = this.route.snapshot.paramMap.get('id');
    }
}
