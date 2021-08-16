export interface Iproduct {
    
       pageIndex:number,
        pageSize:number,
        count:number,
        data: [
          {
            id: number,
            name: string,
            description: string,
            price:number,
            pictureUrl:string,
             rating:number,
             qount:number,
             priceBuy_one:number,
             priceBuyOrgnal_all:number,
             price_Sall_one:number,
             price_Sall_all:number,
             earn_Money:number,
             date_attach: Date,
             date_Experied: Date,
             comment :string,
             productTypeId:number,
             productype: {
               id:number,
               name: string,
            },
             productBrandId:string,
             productbrand: {
               id:number,
               name:string,
            },
             ProductGallary:
            {
                  Name:string,
                  Url:string,
                   productId:number, 
                  product:Iproduct
           
           
          },
        }
        ]
      }
    
