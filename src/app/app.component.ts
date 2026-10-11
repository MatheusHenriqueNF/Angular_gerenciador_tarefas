import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Task { id: number; title: string; done: boolean; }
const KEY = 'angular-portfolio-tasks';
function loadTasks(): Task[] { try { const data = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(data) ? data : []; } catch { return []; } }
@Component({selector:'app-root',standalone:true,imports:[FormsModule],templateUrl:'./app.component.html'})
export class AppComponent {
  newTitle = '';
  readonly filter = signal<'all'|'pending'|'done'>('all');
  readonly tasks = signal<Task[]>(loadTasks());
  readonly completed = computed(() => this.tasks().filter(t => t.done).length);
  readonly visibleTasks = computed(() => this.tasks().filter(t => this.filter() === 'all' || (this.filter() === 'done' ? t.done : !t.done)));
  add(): void { const title = this.newTitle.trim(); if (!title) return;
    this.persist([...this.tasks(), { id: Date.now(), title, done: false }]); this.newTitle = ''; }
  toggle(id: number): void { this.persist(this.tasks().map(t => t.id === id ? {...t, done: !t.done} : t)); }
  remove(id: number): void { this.persist(this.tasks().filter(t => t.id !== id)); }
  private persist(items: Task[]): void { this.tasks.set(items); localStorage.setItem(KEY, JSON.stringify(items)); }
}
