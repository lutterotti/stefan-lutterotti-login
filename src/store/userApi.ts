import { Album, Post, User } from "../features/login/user.interface";
import { from, Observable, combineLatest, of } from 'rxjs';
import { map, debounceTime, mergeMap } from 'rxjs/operators';

// What I decided to do was to turn the promises from our REST APIs into observables and leverage RXJS
// Using observables allows for the ability to pipe the stream of data in a way that allows us to fetch only
// the albums and posts that are directly corelated to the selected user
// added a debounce time to show the fun little spinner, its quite quick without it.

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
