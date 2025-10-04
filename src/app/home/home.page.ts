import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonIcon,
  IonButtons,
  IonAvatar,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../todo.service';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, checkmarkOutline, closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonButtons,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonIcon,
    IonAvatar,
  ],
})
export class HomePage {
  todos: Todo[] = [];
  newTitle = '';
  editId: number | null = null;
  editTitle = '';

  constructor(private todoService: TodoService) {
    this.loadTodos();

    document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      this.addTodo();
    }
  });

  addIcons({
      createOutline,
      trashOutline, 
      checkmarkOutline,
      closeOutline
    });
    
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  }

  loadTodos() {
    this.todos = this.todoService.getTodos();
  }

  addTodo() {
    if (this.newTitle.trim()) {
      this.todoService.addTodo(this.newTitle.trim());
      this.newTitle = '';
      this.loadTodos();
    }
  }

  toggleDone(id: number) {
    this.todoService.toggleDone(id);
    this.loadTodos();
  }

  startEdit(todo: Todo) {
    this.editId = todo.id;
    this.editTitle = todo.title;
  }

  saveEdit() {
    if (this.editId !== null && this.editTitle.trim()) {
      this.todoService.editTodo(this.editId, this.editTitle.trim());
      this.editId = null;
      this.editTitle = '';
      this.loadTodos();
    }
  }

  cancelEdit() {
    this.editId = null;
    this.editTitle = '';
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
    this.loadTodos();
  }
}
