import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {PayByCardFormComponent} from '../app/main/pay-by-card-form/pay-by-card-form.component';
import {PayFromOnlineBankComponent} from '../app/main/pay-from-online-bank/pay-from-online-bank.component';
import {RequestPaymentComponent} from '../app/main/request-payment/request-payment.component';
import {LoginerComponent} from '../app/loginer/loginer.component';
import {AdminPanelComponent} from '../app/admin-panel/admin-panel.component';
import {RegistratorComponent} from '../app/registrator/registrator.component';

const appRoutes: Routes = [
  {
    path: '',
    component: PayByCardFormComponent,
  },
  {
    path: 'login',
    component: LoginerComponent,
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
  },
  {
    path: 'registration',
    component: RegistratorComponent,
  },
  {
    path: 'pay-by-card',
    component: PayByCardFormComponent
  },
  {
    path: 'pay-from-online-bank',
    component: PayFromOnlineBankComponent
  },
  {
    path: 'request-payment',
    component: RequestPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
