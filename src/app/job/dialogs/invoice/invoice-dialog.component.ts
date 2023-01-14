import {Component, Inject, OnInit} from "@angular/core";
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog";
import {Task} from "../../../core/models/task.model";
import {UntypedFormGroup, UntypedFormControl, Validators} from "@angular/forms";

@Component({
    selector: 'invoice-dialog',
    templateUrl: 'invoice-dialog.component.html',
})
export class InvoiceDialogComponent implements OnInit {
    public form: UntypedFormGroup;

    public constructor(
        public dialogRef: MatDialogRef<InvoiceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {}

    public ngOnInit() {
        this.form = new UntypedFormGroup({
            invoiceNumber: new UntypedFormControl(this.data, [Validators.required])
        });

        this.form.valueChanges.subscribe((newData) => {
            this.data = newData.invoiceNumber;
        });
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }
}