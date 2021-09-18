export interface ITwit {
    id:        number;
    createdAt: Date;
    updatedAt: Date;
    text:      string;
    authorId:  number;
    author:    Author;
    likes: number;
}

export interface Author {
    username: string;
    pfp: string;
}
