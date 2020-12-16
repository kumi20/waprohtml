import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss']
})
export class DynamicComponentComponent implements OnInit {

  @Input() componentData;
  @Input() extraData;

  @ViewChild('dynamicComponentContainer', {static: true, read: ViewContainerRef}) dynamicComponentContainer;
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentData);
    const componentRef = this.dynamicComponentContainer.createComponent(factory, 0 );

    for(let prop in this.extraData){
      componentRef.instance[prop] = this.extraData[prop];
    }
  }

}
