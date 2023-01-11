import {Component, Inject, OnInit} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {Task} from "../../../core/models/task.model";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'invoice-dialog',
    templateUrl: 'invoice-dialog.component.html',
})
export class InvoiceDialogComponent implements OnInit {
    public form: FormGroup;

    public constructor(
        public dialogRef: MatDialogRef<InvoiceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {}

    public ngOnInit() {
        this.form = new FormGroup({
            invoiceNumber: new FormControl(this.data, [Validators.required])
        });

        this.form.valueChanges.subscribe((newData) => {
            this.data = newData.invoiceNumber;
        });
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }
}