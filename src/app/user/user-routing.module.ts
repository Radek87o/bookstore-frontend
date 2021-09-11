import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { MainViewComponent } from "./main-view/main-view.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { OrderListComponent } from "./order-list/order-list.component";

const routes: Routes = [
    { path:'edytuj', component: EditUserComponent },
    { path:'zamowienia/:orderId', component: OrderDetailsComponent },
    { path:'zamowienia', component: OrderListComponent },
    { path:'', component: MainViewComponent }
];

@NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
export class UserRoutingModule { }