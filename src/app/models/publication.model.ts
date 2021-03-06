import { SocialInteraction } from './socialInteraction.model';

export interface Publication {
  id: number,
  publisher_id: number,
  banner: string,
  section_order: Number[],
  title: string,
  likes: SocialInteraction,
  dislikes: SocialInteraction,
  when: {
    milli: number;
    date: string
  }
}