import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PayFromOnlineBankComponent } from './main/pay-from-online-bank/pay-from-online-bank.component';
import { RequestPaymentComponent } from './main/request-payment/request-payment.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { PersonInfoComponent } from './header/person-info/person-info.component';
import { PayByCardFormComponent } from './main/pay-by-card-form/pay-by-card-form.component';
import { PayFromOnlineBankFormComponent } from './main/pay-from-online-bank/pay-from-online-bank-form/pay-from-online-bank-form.component';
import { RequestPaymentFormComponent } from './main/request-payment/request-payment-form/request-payment-form.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HttpClientModule} from '@angular/common/http';
import { LoginerComponent } from './loginer/loginer.component';
import { RegistratorComponent } from './registrator/registrator.component';
import { MessageComponent } from './message/message.component';
import { WaitScreenComponent } from './wait-screen/wait-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PayFromOnlineBankComponent,
    RequestPaymentComponent,
    FooterComponent,
    MainComponent,
    PersonInfoComponent,
    PayByCardFormComponent,
    PayFromOnlineBankFormComponent,
    RequestPaymentFormComponent,
    AdminPanelComponent,
    LoginerComponent,
    RegistratorComponent,
    MessageComponent,
    WaitScreenComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
