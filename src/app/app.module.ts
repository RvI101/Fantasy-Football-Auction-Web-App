import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { BidComponent } from './bid/bid.component';
import { LeagueComponent } from './league/league.component';
import { LoginComponent } from './login/login.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { SquadListComponent } from './squad-list/squad-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { LeagueHomeComponent } from './league/league-home/league-home.component';
import { LeagueCreateComponent } from './league/league-create/league-create.component';
import { LeagueJoinComponent } from './league/league-join/league-join.component';
import { LeagueHubComponent } from './league/league-hub/league-hub.component';
import { LeaguePoolComponent } from './league/league-hub/league-pool/league-pool.component';
import { LeaguePoolTableComponent } from './league/league-hub/league-pool-table/league-pool-table.component';
import { ToastContainerComponent } from './toast/toast-container/toast-container.component';
import { BidCartComponent } from './league/league-hub/bid-cart/bid-cart.component';
import { MySquadComponent } from './league/league-hub/my-squad/my-squad.component';
import { BidHistoryComponent } from './league/league-hub/bid-history/bid-history.component';
import { LeagueAdminConsoleComponent } from './league/league-hub/league-admin-console/league-admin-console.component';
import { RulesComponent } from './rules/rules.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamCreateComponent,
    BidComponent,
    LeagueComponent,
    LoginComponent,
    PlayerListComponent,
    SquadListComponent,
    LeagueHomeComponent,
    LeagueCreateComponent,
    LeagueJoinComponent,
    LeagueHubComponent,
    LeaguePoolComponent,
    LeaguePoolTableComponent,
    ToastContainerComponent,
    BidCartComponent,
    MySquadComponent,
    BidHistoryComponent,
    LeagueAdminConsoleComponent,
    RulesComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
