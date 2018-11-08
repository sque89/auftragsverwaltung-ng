import {Component, Inject, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {Task} from "../../../core/models/task.model";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {TaskFormDialogData} from "./data.model";

@Component({
    selector: 'task-form-dialog',
    templateUrl: 'task-form-dialog.component.html',
})
export class TaskFormDialogComponent implements OnInit {
    public form: FormGroup;

    public constructor(
        public dialogRef: MatDialogRef<TaskFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: TaskFormDialogData
    ) {}

    public ngOnInit() {
        this.form = new FormGroup({
            description: new FormControl(this.data.task.description, [Validators.required]),
            workingTime: new FormControl(this.data.task.workingTime, [Validators.required]),
            date: new FormControl(this.data.task.date, [Validators.required])
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