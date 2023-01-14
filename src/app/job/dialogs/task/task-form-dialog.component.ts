import {Component, Inject, OnInit} from "@angular/core";
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog";
import {Task} from "../../../core/models/task.model";
import {UntypedFormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {TaskFormDialogData} from "./data.model";

@Component({
    selector: 'task-form-dialog',
    templateUrl: 'task-form-dialog.component.html',
})
export class TaskFormDialogComponent implements OnInit {
    public form: UntypedFormGroup;

    public constructor(
        public dialogRef: MatDialogRef<TaskFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: TaskFormDialogData
    ) {}

    public ngOnInit() {
        this.form = new UntypedFormGroup({
            description: new UntypedFormControl(this.data.task.description, [Validators.required]),
            workingTime: new UntypedFormControl(this.data.task.workingTime, [Validators.required]),
            date: new UntypedFormControl(this.data.task.date, [Validators.required])
        });

        this.form.valueChanges.subscribe((newData) => {
            this.data.task.description = newData.description;
            this.data.task.workingTime = newData.workingTime;
            this.data.task.date = newData.date;
        });
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }
}