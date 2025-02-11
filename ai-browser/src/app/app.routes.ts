import { Routes } from '@angular/router';
import { TabcontentComponent } from './tabcontent/tabcontent.component';

export const routes: Routes = [
    { path: '', component: TabcontentComponent },
    { path: 'tab/:id', component: TabcontentComponent }
    
];
