export interface Boletim {
    id: string,
    name: string,
    initials: string,
    img_background: string,
    icon: string,
    title: string,
    message: string,
    likes: number,
    dislikes: number,
    when: {
      milli: number;
      date: string
    },
    comments: String[]
}