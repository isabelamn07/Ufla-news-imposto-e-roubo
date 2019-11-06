interface likes {
    quantity: number,
    usernameList: String[]
}

export interface Boletim {
    id: number,
    publisher_id: number,
    banner: string,
    section_id: Number[],
    title: string,
    message: string,
    likes: Number[],
    dislikes: Number[],
    when: {
      milli: number;
      date: string
    }
};