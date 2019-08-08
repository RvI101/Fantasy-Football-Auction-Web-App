import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeagueComponent } from './league/league.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { LeagueHubComponent } from './league/league-hub/league-hub.component';
import { LeaguePoolComponent } from './league/league-hub/league-pool/league-pool.component';
import { LeagueAdminConsoleComponent } from './league/league-hub/league-admin-console/league-admin-console.component';
import { IsLeagueAdminGuard } from './guards/is-league-admin.guard';
import { RulesComponent } from './rules/rules.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'players', component: PlayerListComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'leagues', component: LeagueComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'leagues/:id', component: LeagueHubComponent, canActivate: [AngularFireAuthGuard], children: [
    {path: 'admin', component: LeagueAdminConsoleComponent, canActivate: [IsLeagueAdminGuard]}
  ]},
  {path: 'rules', component: RulesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
