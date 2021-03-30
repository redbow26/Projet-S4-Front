export interface Jeux {
  id;
  nom;
  description;
  regles;
  url_media;
  theme;
  theme_id;
  editeur;
  editeur_id;
  duree;
  langue;
  nombre_joueur;
  poids;
  age;
  categorie;
  mecanique;
  commentaires;
  statistiques;
  tarif;
}

export interface Theme {
  id: number;
  nom: string;
}

export interface Mecanique {
  id: number;
  nom: string;
}

export interface Editeur {
  id: number;
  nom: string;
}
