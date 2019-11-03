interface likes {
    quantity: number,
    usernameList: String[]
}

export interface Boletim {
    id: string,
    name: string,
    initials: string,
    img_background: string,
    icon: string,
    title: string,
    message: string,
    likes: likes,
    dislikes: Object,
    when: {
      milli: number;
      date: string
    },
    comments: String[]
};