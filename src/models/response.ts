export interface Response<T>  {
    items?: T[];
    meta?:  Meta;
    links?: Links;
}


export interface Links {
    first?:    string;
    previous?: string;
    next?:     string;
    last?:     string;
}

export interface Meta {
    totalItems?:   number;
    itemCount?:    number;
    itemsPerPage?: number;
    totalPages?:   number;
    currentPage?:  number;
}
