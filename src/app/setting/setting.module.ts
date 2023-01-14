import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SettingRoutingModule} from './setting-routing.module';
import {SettingComponent} from './setting.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        SettingRoutingModule,
        MatInputModule,
        MatButtonModule
    ],
    declarations: [
        SettingComponent
    ]
})
export class SettingModule {}