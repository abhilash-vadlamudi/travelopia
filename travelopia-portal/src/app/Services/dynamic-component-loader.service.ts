import {
    Injectable,
    ComponentFactoryResolver,
    ViewContainerRef
} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DynamicComponentLoaderService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }


    loadComponent(viewContainerRef: ViewContainerRef, component) {
        viewContainerRef.clear();
        
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        return viewContainerRef.createComponent(componentFactory);
    }
}