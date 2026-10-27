export interface User{
    id: string;
    name: string
    email: string;               
    emailVerified?: string | null;
    password: string;    
    role: string;    
    images?: string | null;
}