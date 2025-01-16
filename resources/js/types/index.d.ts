export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Ingredient {
    id: number;
    name: string;
    price: number;
}

export interface PizzaFormData {
    [key: string]: string | number | string[] | number[]; 
    name: string;
    image: string;
    ingredient_ids: (string | number)[]; 
}


export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
