export interface MyProduct {
   Id:number,
    Name:string,
    Description:string,
    Price:number,
    PictureUrl?:"",
     ConvertPictureUrl:string,
    rating:number,
     Qount:number,
    priceBuy_one:number,
    priceBuyOrgnal_all:number,
    price_Sall_one:number,
    price_Sall_all:number,
    earn_Money:number,
    Date_attach:string,
    Date_Experied:string,
    comment:string,

    
    
     ProductTypeId:number,

      productype:any,
   
    
     ProductBrandId:number,

     productbrand :any,

    picturGallaryFils:"",
     Gallery :any[]

}
