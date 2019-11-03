interface LikeAndDislike {
    quantity: number;
    usernameList: String[]
}

interface PublishDate {
    milli: number;
    date: string;
}

export interface Comment {
    id: number;
    username: string;
    message: string;
    when: PublishDate;
    likes: LikeAndDislike,
    dislikes: LikeAndDislike,
}