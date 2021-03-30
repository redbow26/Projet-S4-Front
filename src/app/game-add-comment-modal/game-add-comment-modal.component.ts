import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JeuxService} from '../_services/jeux.service';

@Component({
  selector: 'app-game-add-comment-modal',
  templateUrl: './game-add-comment-modal.component.html',
  styleUrls: ['./game-add-comment-modal.component.css']
})
export class GameAddCommentModalComponent implements OnInit {
  @Input() id: number;
  @Output() validate = new EventEmitter();
  form: FormGroup;

  constructor(public jeuxService: JeuxService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      commentaire: new FormControl('', Validators.required),
      note: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)])
    });
  }

  sendForm(): void {
    if (this.form.invalid) { return; }
    this.jeuxService.postComment(this.form.value, this.id);
    this.validate.emit(true);
  }

}
