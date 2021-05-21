### Coding Challenge 


**Here are a couple notes for this project: **

1. The bread and butter of this project is in how I'm fetching the user's data
  -   Instead of fetching directly inside of the component, Im using an async action to transform the promises into observables
  -   I chose this approach because it allowed me to target a user's posts and albums rather than fetching the whole list and then filtering afterwards making the    fetch call a lot quicker

2. I decided to use Redux to keep the incoming data as organized as possible and avoid having to pass a bunch of data through props.

3. In the login page, the password field is disabled simply because there are no passwords on the user object
  - to get in use `Sincere@april.biz`, `Shanna@melissa.tv` or `Nathan@yesenia.net`

4. I decided to add some photos to the albums and user to make it more visually appealing
