import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';


@Injectable({
  providedIn: 'root'
})

export class DrawerServiceService {
  private drawerElement: MatDrawer | null = null;
  // displayItem!: String;
  sidebarDrawer!: {displayItem: string}
  // private displayItem: String = ""
  constructor() { }

  public setDrawer(drawer: MatDrawer){
    this.drawerElement = drawer;
  }

  public setSidebarDrawer(sidebarDrawer: {displayItem: string}){
    this.sidebarDrawer = sidebarDrawer
  }
  public open(item: string) {
    if(this.drawerElement == null) return
    this.sidebarDrawer.displayItem = item
    return this.drawerElement.open();
  }

  public close() {
    if(this.drawerElement == null) return
    return this.drawerElement.close();
  }

  public toggle(item: string): void {
    console.log(item)
    if(this.drawerElement == null) return
    if(this.drawerElement.opened && this.sidebarDrawer.displayItem == item){
      this.sidebarDrawer.displayItem = ""
      this.drawerElement.close()
      return
    }

    this.sidebarDrawer.displayItem = item
    this.drawerElement.open();
  }
}
