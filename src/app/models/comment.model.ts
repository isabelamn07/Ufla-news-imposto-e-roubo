// interface LikeAndDislike {
//     quantity: number;
//     usernameList: String[];
// }

interface PublishDate {
    milli: number;
    date: string;
}

export interface Comment {
    id: number;
    username: string;
    publication_id: number;
    message: string;
    when: PublishDate;
    likes?: Number[];
    dislikes?: Number[];
}

