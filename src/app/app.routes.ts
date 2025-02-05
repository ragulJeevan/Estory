import { Routes } from '@angular/router';

const authModule =()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule);
const coreModule = () => import('./core/core.module').then(m=>m.CoreModule);
// const paymentsModule = () => import('./payments/payments.module').then(m=>m.PaymentsModule);

export const routes: Routes = [
    {path:'auth',loadChildren:authModule},
    {path:'core',loadChildren:coreModule},
    // {path:'payments',loadChildren:paymentsModule}
    {path:'',redirectTo:'core/stories',pathMatch:'full'},
];
