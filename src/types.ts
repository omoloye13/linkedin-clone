export type Post = {
    id:string;
    content:string;
    //the image is having this query because not all posts can have an image
    image?:string;
    comments:string;
    likes:number;
    profile:User;
    comment:string;
}

export type User = {
    id:string;
    name:string;
    //the image is having this query because not all posts can have an image
    image?:string;
    position:string;
    comment:string;
    about?:string,
    backimage:string,
    experience?:Experience[]

   
}
export type Experience ={
    id:string,
    title:string,
    companyname:string,
    companyimage?:string
}