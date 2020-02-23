import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/component/dashboard.component';
import { JobDetailsComponent } from './job-details/component/job-details.component';
import { JobDetailsResolverService } from './job-details/resolver/job-details.resolver.service';
import { DashboardResolverService } from './dashboard/resolver/dashboard.resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      allJobs: DashboardResolverService,
    },
  },
  {
    path: 'job/details/:id',
    component: JobDetailsComponent,
    resolve: {
      job: JobDetailsResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
