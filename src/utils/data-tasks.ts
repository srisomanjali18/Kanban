export type Status = 'todo' | 'in-progress' | 'done'
export type Task = 
{
    title:string,
    id : string,
    status: Status,
    points? : number
}


export const statuses : Status[] = ['todo', 'in-progress', 'done']
  