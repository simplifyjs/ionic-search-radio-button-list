import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit{
  itemForm: FormGroup;
  defaultItems = [
    {name: 'Mandrake'},
    {name: 'Kimmy'},
    {name: 'Lancelot'},
    {name: 'Barats'},
  ];

  items = this.defaultItems;

  selectedItem: string;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.itemForm = this.fb.group({
      itemName: ['']
    });
  }

  onSearch(event) {
    if (!event.target.value) {
      this.items = this.defaultItems;
    } else {
      const filteredUnits = this.items.filter(item => {
        return ((item['name']).toLowerCase().trim()).includes(event.target.value.toLowerCase().trim());
      });
      this.items = filteredUnits;
    }
  }

  getSelected(event: CustomEvent, field: string): void {
    const filteredUnit = this.items.filter(item => {
      return item.name === event.detail.value;
    });

    if (filteredUnit.length && field === 'selectedUnit') {
      this.selectedItem = filteredUnit['name'];
    }
  }

  onSubmit() {
    console.log('Submitted Value', this.itemForm.value)
  }

}
