import { Album, Post, User } from "../features/login/user.interface";
import { from, Observable, combineLatest, of } from 'rxjs';
import { map, debounceTime, mergeMap } from 'rxjs/operators';
// A mock function to mimic making an async request for data

function getUsers(): Observable<any> {
  return from(fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()))
}

function getSelectedAlbums(user: User) {
  const id = user ? user.id : 0;
  return from(fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`).then((response) => response.json())) as Observable<Album[]>;
}

function getSelectedPosts(user: User) {
  const id = user ? user.id : 0;
  return from(fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then((response) => response.json())) as Observable<Post[]>;
}
export function fetchUser(login_email: string): Observable<any> {
  return getUsers()
    .pipe(debounceTime(700))
    .pipe(mergeMap((users: User[]) => {
      const [selected_user] = users.filter((user: User) => user.email === login_email);
      return combineLatest([of(selected_user), getSelectedPosts(selected_user), getSelectedAlbums(selected_user)])
    }))
    .pipe(map(([user, posts, albums]) => ({user, posts, albums})))
}
