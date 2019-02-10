import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';
import { ListuserComponent } from './components/listuser/listuser.component';
import { OrderuserComponent } from './components/orderuser/orderuser.component';

// Firebase

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

import { AngularFirestoreModule } from 'angularfire2/firestore'
// Service
import { AuthService } from './services/auth.service';
// Guard
import { AuthGuard } from './guards/auth.guard';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ScorllService } from './scorllservice/scorll.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
// Routes
/* export const router: Routes = [
 { path: '', component: HomeComponent },
 { path: 'login', component: LoginComponent },
 { path: 'signup', component: SignupComponent },
 { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
] */
export const router: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'listuser', component: ListuserComponent },
  { path: 'orderuser/:id', component: OrderuserComponent },
  { path: 'editpass', component: EditpassComponent },
  { path: 'orderall', component: OrderallComponent }


];
// Config Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyC-uL0L0mkZ7Kp3WcTncM-9K0eL-dfAIVA",
  authDomain: "ionic-proj2.firebaseapp.com",
  databaseURL: "https://ionic-proj2.firebaseio.com",
  projectId: "ionic-proj2",
  storageBucket: "ionic-proj2.appspot.com",
  messagingSenderId: "1072279671070"

};
import { environment } from './environments/environment';
import { SearchingproductService } from './service/searchingproduct.service';
import { EditpassComponent } from './components/editpass/editpass.component';
import { AuthserviceService } from './auth/authservice.service';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { ExportService } from './export/export.service';
import { OrderallComponent } from './components/orderall/orderall.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProductComponent,
    ListuserComponent,
    OrderuserComponent,
    EditpassComponent,
    LoadingSpinnerComponent,
    OrderallComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    InfiniteScrollModule,

  ],
  providers: [AuthserviceService, AuthService, AngularFireDatabase, AuthGuard, SearchingproductService, ScorllService, ExportService],

  bootstrap: [AppComponent]
})
export class AppModule { }
