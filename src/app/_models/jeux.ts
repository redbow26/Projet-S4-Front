export interface Jeux {
  nom;
  description;
  regles;
  url_media;
  theme;
  editeur;
  duree;
  langue;
  nombre_joueur;
  poids;
  age;
  categorie;
  mecanique;
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
