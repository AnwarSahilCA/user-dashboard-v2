import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsereventDataSource, UsereventItem } from './userevent-datasource';
import { ServiceService } from '../service.service';
import { Events } from '../model/Event';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { v4 as uuidv4 } from 'uuid';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { comments } from '../model/comments';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
// const THUMBUP_ICON =
//   `
//   <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
//     <path d="M0 0h24v24H0z" fill="none"/>
//     <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
//   `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
//   `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
//   </svg>
// `;

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

/**
 * @title Table with filtering
 */



@Component({
  selector: 'app-userevent',
  templateUrl: './userevent.component.html',
  styleUrls: ['./userevent.component.css'],
  // standalone: true,
 
  
})
export class UsereventComponent implements OnInit{
  constructor(private modalService: NgbModal,private service:ServiceService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    //iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
    
  iconRegistry.addSvgIcon('check', sanitizer.bypassSecurityTrustResourceUrl('assets/check-circle.svg'));
  
  iconRegistry.addSvgIcon('cross', sanitizer.bypassSecurityTrustResourceUrl('assets/cross-circle.svg'));  }
  
 
 
  products1: Events[]=[];
  a:number=0;
  closeResult = '';
  comment:comments=new comments();
  
  ngOnInit(): void {
    this.products1 = this.getProducts();
  }

 
   
    
  
  
  displayedColumns: string[] = ['event_id','title', 'description', 'deadline','status','comments'];
  dataSource: MatTableDataSource<Events> = new MatTableDataSource<Events>([]);
  
  
  
 
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
//   getProducts():any{
//     this.service.getProducts().subscribe((products)=>{
//     this.products1= products;
//     this.dataSource.data = this.products1;
//   });
// }
// getProducts(): any {
//   this.service.getProducts().subscribe((products) => {
//     this.products1 = products.map((product, index) => ({
//       ...product,
//       id: index + 1
//     }));
//     this.dataSource.data = this.products1;
//   });
// }
getProducts(): any {
  this.service.getProducts().subscribe((products) => {
    this.products1 = products.map(product=>({...product, showTextField:false,textField:''}));
      
    
    this.dataSource.data = this.products1;
  });
}
toggletextField(item:any){
  item.showTextField=!item.showTextField;
}

inputCreated = false;
inputPlaceholder = 'Enter value';
inputValue = '';

// createInput(productId: number) {
//   const product = this.dataSource.data.find(p => p.id === productId);
//   if (product) {
//     product.inputCreated = true;
//     // You can perform other logic specific to the row here
//   }
// }
open(content: any) {
  this.modalService.open(content,
 {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = 
       `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
event:any;
onSubmit(eventid:number){
  this.comment.event_id=eventid;
  this.saveProduct();
  console.log(this.comment);
}
saveProduct(){
  this.service.saveProduct(this.comment).subscribe(data=>{
    console.log(data);
  },
  error=>console.log(error));
}
// updatestatus(eventId:number){
//   this.service.getProductById(eventId).subscribe((product)=>{this.event=product;
//     this.event.status="completed";},
//   (error)=>{console.log("message",error);});
  
  
//   this.service.updateProduct(this.event).subscribe(
//     (response) => {
//       console.log('Product updated successfully');
//     },
//     (error) => {
//       console.log('Error updating product:', error);
//     }
//   );
// }
isIconActive = false;
updatestatus(eventId: number) {
  this.isIconActive = !this.isIconActive;
  this.service.getProductById(eventId).subscribe(
    (product) => {
      this.event = product;
      this.event.status = "completed";

      this.service.updateProduct(this.event).subscribe(
        (response) => {
          console.log('Product updated successfully');
        },
        (error) => {
          console.log('Error updating product:', error);
        }
      );
    },
    (error) => {
      console.log("Error fetching product:", error);
    }
  );
}

}



