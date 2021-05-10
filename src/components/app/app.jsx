import React, { Component } from 'react';
import TodoList from '../todo-list/todo-list';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';
import './app.css';

export default class App extends Component{

  maxID = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem (label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxID++
    }
  }

  toggleProperty (arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
      
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      
      const idx = todoData.findIndex(el => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArr
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr
      }
    });
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  }  

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });    
  }  

  render () {
    const {todoData} = this.state;
   
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="app">
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel/>
          <ItemStatusFilter/>
        </div>
        <TodoList 
          todoData={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}/>
        <ItemAddForm onAddItem={this.addItem}/>  
      </div>
    );
  
  }
}
