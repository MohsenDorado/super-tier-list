import { Card } from '@prisma/client';
 export type CardType={
    cards:Card[]
}

export type SortCategoriesType = keyof Card;
export type MemberCardOrderQueriesType={
    id:number 
    name:string
    orderCategory:SortCategoriesType
    order:"desc"|"asc"
}